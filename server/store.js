import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
const sitePath = path.join(dataDir, 'site.json');

export function defaultSite() {
  return {
    metaTitle: 'Mumbere Mathe Samuel — Développeur IoT & Fullstack',
    identity: {
      brand: 'MMS',
      firstName: 'Mumbere',
      lastName: 'Mathe Samuel',
      taglinePrefix: 'Développeur',
      typedPhrases: ['IoT & Embarqué', 'Fullstack Django', 'Arduino & ESP32', 'Python & C++'],
      location: 'Goma, République Démocratique du Congo',
    },
    hero: {
      badge: 'Disponible pour missions freelance',
      stats: [
        { value: 2, label: 'Projets livrés' },
        { value: 30, label: 'Équipes max système quiz' },
        { value: 100, label: '% Satisfaction client' },
      ],
    },
    about: {
      paragraphs: [
        "Ingénieur en génie informatique passionné par l'électronique embarquée et le développement web fullstack, basé à Goma en RDC.",
        "Je conçois des systèmes IoT complets — du firmware Arduino jusqu'au backend Django — en passant par les protocoles radio nRF24L01 et la commande DMX512 pour l'éclairage événementiel.",
        'Ma particularité : je livre des projets clé en main, matériel et logiciel, en télétravail depuis l\'Afrique pour des clients européens.',
      ],
      details: [
        { icon: 'graduation-cap', title: 'Génie Informatique', subtitle: 'ULPGL, Goma' },
        { icon: 'school', title: 'Électronique', subtitle: 'École secondaire, Goma' },
        { icon: 'map-marker-alt', title: 'Goma, RDC', subtitle: 'Disponible en remote' },
        { icon: 'language', title: 'Français natif', subtitle: 'Anglais en cours' },
      ],
    },
    social: {
      github: 'https://github.com/Samuelmathe',
      linkedin: 'https://www.linkedin.com/in/samuel-mathr-479abb283/',
      comeup: 'https://comeup.com/fr/@samuelmathr',
    },
    contact: {
      intro:
        "Vous avez un projet IoT, un site web à créer ou besoin d'un développeur freelance ? Contactez-moi !",
      email: 'mathrsamuel@gmail.com',
      whatsappE164: '243810626051',
      whatsappDisplay: '+243 810 626 051',
      comeupUrl: 'https://comeup.com/fr/@samuelmathr',
      comeupLabel: 'Profil Comeup',
      githubUrl: 'https://github.com/Samuelmathe',
      githubDisplay: 'github.com/Samuelmathe',
    },
    footer: {
      line: 'Mumbere Mathe Samuel · Développeur IoT & Fullstack · Goma, RDC',
      copyright: '© 2026 Mumbere Mathe Samuel. Fait avec passion depuis Goma 🌋',
    },
    cvFilename: 'cv.pdf',
  };
}

async function readJson(file, fallback) {
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch {
    return structuredClone(fallback);
  }
}

async function writeJson(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

export async function getSite() {
  const data = await readJson(sitePath, defaultSite());
  return mergeSite(defaultSite(), data);
}

export async function saveSite(input) {
  const merged = mergeSite(defaultSite(), input);
  sanitizeSiteInPlace(merged);
  await writeJson(sitePath, merged);
  return merged;
}

function mergeSite(base, patch) {
  const out = structuredClone(base);
  if (patch.metaTitle != null) out.metaTitle = String(patch.metaTitle);
  if (patch.identity && typeof patch.identity === 'object') {
    const id = patch.identity;
    if (id.brand != null) out.identity.brand = String(id.brand).slice(0, 20);
    if (id.firstName != null) out.identity.firstName = String(id.firstName).slice(0, 80);
    if (id.lastName != null) out.identity.lastName = String(id.lastName).slice(0, 80);
    if (id.taglinePrefix != null) out.identity.taglinePrefix = String(id.taglinePrefix).slice(0, 80);
    if (id.location != null) out.identity.location = String(id.location).slice(0, 200);
    if (Array.isArray(id.typedPhrases) && id.typedPhrases.length) {
      out.identity.typedPhrases = id.typedPhrases.map(String).filter(Boolean).slice(0, 12);
    }
  }
  if (patch.hero && typeof patch.hero === 'object') {
    if (patch.hero.badge != null) out.hero.badge = String(patch.hero.badge);
    if (Array.isArray(patch.hero.stats)) {
      out.hero.stats = patch.hero.stats
        .slice(0, 6)
        .map((s) => ({
          value: Math.max(0, Math.min(999999999, Number(s.value) || 0)),
          label: String(s.label || '').slice(0, 120),
        }))
        .filter((s) => s.label.length > 0);
    }
  }
  if (patch.about && typeof patch.about === 'object') {
    if (Array.isArray(patch.about.paragraphs)) {
      out.about.paragraphs = patch.about.paragraphs.map((p) => String(p).slice(0, 2000)).slice(0, 8);
    }
    if (Array.isArray(patch.about.details)) {
      out.about.details = patch.about.details
        .slice(0, 8)
        .map((d) => ({
          icon: String(d.icon || 'circle').replace(/[^a-z0-9-]/gi, '').slice(0, 40),
          title: String(d.title || '').slice(0, 120),
          subtitle: String(d.subtitle || '').slice(0, 200),
        }))
        .filter((d) => d.title.length > 0);
    }
  }
  if (patch.social && typeof patch.social === 'object') {
    for (const k of ['github', 'linkedin', 'comeup']) {
      if (patch.social[k] != null) out.social[k] = String(patch.social[k]).slice(0, 500);
    }
  }
  if (patch.contact && typeof patch.contact === 'object') {
    for (const k of [
      'intro',
      'email',
      'whatsappE164',
      'whatsappDisplay',
      'comeupUrl',
      'comeupLabel',
      'githubUrl',
      'githubDisplay',
    ]) {
      if (patch.contact[k] != null) out.contact[k] = String(patch.contact[k]).slice(0, 2000);
    }
  }
  if (patch.footer && typeof patch.footer === 'object') {
    if (patch.footer.line != null) out.footer.line = String(patch.footer.line).slice(0, 300);
    if (patch.footer.copyright != null) out.footer.copyright = String(patch.footer.copyright).slice(0, 300);
  }
  if (patch.cvFilename != null) {
    out.cvFilename = String(patch.cvFilename).replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 120) || 'cv.pdf';
  }
  if (!out.hero.stats.length) out.hero.stats = structuredClone(defaultSite().hero.stats);
  if (!out.about.paragraphs.length) out.about.paragraphs = structuredClone(defaultSite().about.paragraphs);
  if (!out.about.details.length) out.about.details = structuredClone(defaultSite().about.details);
  return out;
}

function sanitizeSiteInPlace(site) {
  site.metaTitle = site.metaTitle.slice(0, 200);
  site.identity.brand = site.identity.brand.slice(0, 20);
  site.identity.firstName = site.identity.firstName.slice(0, 80);
  site.identity.lastName = site.identity.lastName.slice(0, 80);
  site.identity.taglinePrefix = site.identity.taglinePrefix.slice(0, 80);
  site.identity.location = site.identity.location.slice(0, 200);
  site.hero.badge = site.hero.badge.slice(0, 200);
}
