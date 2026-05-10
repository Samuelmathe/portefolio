import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import session from 'express-session';
import * as store from './store.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const dataFile = path.join(__dirname, 'data', 'contacts.ndjson');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');
app.use(express.json({ limit: '256kb' }));

const sessionSecret = process.env.SESSION_SECRET || 'dev-change-me-in-production';
app.use(
  session({
    name: 'portfolio_sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);

function checkAdminPassword(pw) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected || typeof pw !== 'string') return false;
  try {
    const a = Buffer.from(pw, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  if (!req.session?.admin) {
    return res.status(401).json({ error: 'Non autorisé.' });
  }
  next();
}

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de demandes. Réessaie dans quelques minutes.' },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives de connexion.' },
});

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function appendLocalLog(entry) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.appendFile(dataFile, JSON.stringify(entry) + '\n', 'utf8');
}

async function sendMail({ name, email, projectType, message }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO;

  if (!host || !user || !pass || !to) return false;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });

  const subject = `[Portfolio] Message de ${name}`;
  const text = [
    `Nom: ${name}`,
    `Email: ${email}`,
    `Type de projet: ${projectType || '(non précisé)'}`,
    '',
    message,
  ].join('\n');

  await transporter.sendMail({
    from: process.env.MAIL_FROM || user,
    to,
    replyTo: email,
    subject,
    text,
  });
  return true;
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  const email = String(req.body?.email ?? '').trim();
  const projectType = String(req.body?.projectType ?? '').trim();
  const message = String(req.body?.message ?? '').trim();

  if (!name || name.length > 120) {
    return res.status(400).json({ error: 'Nom invalide.' });
  }
  if (!isValidEmail(email) || email.length > 254) {
    return res.status(400).json({ error: 'Email invalide.' });
  }
  if (projectType.length > 200) {
    return res.status(400).json({ error: 'Type de projet trop long.' });
  }
  if (message.length < 10 || message.length > 8000) {
    return res.status(400).json({ error: 'Message entre 10 et 8000 caractères.' });
  }

  const entry = {
    at: new Date().toISOString(),
    name,
    email,
    projectType: projectType || null,
    message,
    ip: req.ip,
  };

  try {
    const mailed = await sendMail({ name, email, projectType, message });
    if (!mailed) await appendLocalLog(entry);
    return res.json({ ok: true, stored: mailed ? 'email' : 'file' });
  } catch (err) {
    console.error('[contact]', err);
    return res.status(500).json({ error: "Impossible d'envoyer le message pour le moment." });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/site', async (_req, res) => {
  try {
    const site = await store.getSite();
    res.json(site);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur lecture site.' });
  }
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(503).json({ error: 'ADMIN_PASSWORD non configuré dans .env' });
  }
  const password = req.body?.password;
  if (!checkAdminPassword(password)) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' });
  }
  req.session.admin = true;
  req.session.save((err) => {
    if (err) return res.status(500).json({ error: 'Session impossible.' });
    res.json({ ok: true });
  });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('portfolio_sid');
    res.json({ ok: true });
  });
});

app.get('/api/admin/me', (req, res) => {
  res.json({ ok: Boolean(req.session?.admin) });
});

app.get('/api/admin/site', requireAdmin, async (_req, res) => {
  res.json(await store.getSite());
});

app.put('/api/admin/site', requireAdmin, async (req, res) => {
  try {
    const site = await store.saveSite(req.body || {});
    res.json(site);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Données site invalides.' });
  }
});

app.use(express.static(rootDir, { extensions: ['html'] }));

app.listen(port, () => {
  console.log(`Site + API sur http://localhost:${port}`);
  console.log(`Admin : http://localhost:${port}/admin.html`);
  if (!process.env.ADMIN_PASSWORD) {
    console.warn('⚠ Définis ADMIN_PASSWORD dans .env pour activer la page admin.');
  }
});
