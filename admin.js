const msgEl = document.getElementById('msg');
const loginPanel = document.getElementById('login-panel');
const dashboard = document.getElementById('dashboard');
const btnLogout = document.getElementById('btn-logout');

function showMsg(text, type) {
  msgEl.innerHTML = text
    ? `<div class="msg ${type === 'ok' ? 'msg-ok' : 'msg-error'}">${text}</div>`
    : '';
}

async function api(path, opts = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
  return data;
}

function siteToForm(site) {
  document.getElementById('f-metaTitle').value = site.metaTitle || '';
  document.getElementById('f-brand').value = site.identity?.brand || '';
  document.getElementById('f-cv').value = site.cvFilename || 'cv.pdf';
  document.getElementById('f-firstName').value = site.identity?.firstName || '';
  document.getElementById('f-lastName').value = site.identity?.lastName || '';
  document.getElementById('f-taglinePrefix').value = site.identity?.taglinePrefix || '';
  document.getElementById('f-location').value = site.identity?.location || '';
  document.getElementById('f-typed').value = (site.identity?.typedPhrases || []).join('\n');
  document.getElementById('f-badge').value = site.hero?.badge || '';
  document.getElementById('f-stats').value = (site.hero?.stats || [])
    .map((s) => `${s.value}|${s.label}`)
    .join('\n');
  const paras = site.about?.paragraphs || [];
  document.getElementById('f-about0').value = paras[0] || '';
  document.getElementById('f-about1').value = paras[1] || '';
  document.getElementById('f-about2').value = paras[2] || '';
  document.getElementById('f-details').value = (site.about?.details || [])
    .map((d) => `${d.icon}|${d.title}|${d.subtitle}`)
    .join('\n');
  document.getElementById('f-github').value = site.social?.github || '';
  document.getElementById('f-linkedin').value = site.social?.linkedin || '';
  document.getElementById('f-comeup').value = site.social?.comeup || '';
  const c = site.contact || {};
  document.getElementById('f-contactIntro').value = c.intro || '';
  document.getElementById('f-email').value = c.email || '';
  document.getElementById('f-waDisplay').value = c.whatsappDisplay || '';
  document.getElementById('f-waE164').value = c.whatsappE164 || '';
  document.getElementById('f-comeupUrl').value = c.comeupUrl || '';
  document.getElementById('f-comeupLabel').value = c.comeupLabel || '';
  document.getElementById('f-githubUrl').value = c.githubUrl || '';
  document.getElementById('f-githubDisplay').value = c.githubDisplay || '';
  document.getElementById('f-footerLine').value = site.footer?.line || '';
  document.getElementById('f-footerCopy').value = site.footer?.copyright || '';
}

function formToSite() {
  const statsLines = document
    .getElementById('f-stats')
    .value.split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const stats = statsLines
    .map((line) => {
      const i = line.indexOf('|');
      if (i === -1) return null;
      const value = Number(line.slice(0, i).trim());
      const label = line.slice(i + 1).trim();
      if (!label || Number.isNaN(value)) return null;
      return { value, label };
    })
    .filter(Boolean);

  const detLines = document
    .getElementById('f-details')
    .value.split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const details = detLines
    .map((line) => {
      const p = line.split('|');
      return {
        icon: (p[0] || '').trim() || 'circle',
        title: (p[1] || '').trim(),
        subtitle: (p[2] || '').trim(),
      };
    })
    .filter((d) => d.title);

  return {
    metaTitle: document.getElementById('f-metaTitle').value.trim(),
    cvFilename: document.getElementById('f-cv').value.trim() || 'cv.pdf',
    identity: {
      brand: document.getElementById('f-brand').value.trim(),
      firstName: document.getElementById('f-firstName').value.trim(),
      lastName: document.getElementById('f-lastName').value.trim(),
      taglinePrefix: document.getElementById('f-taglinePrefix').value.trim(),
      location: document.getElementById('f-location').value.trim(),
      typedPhrases: document
        .getElementById('f-typed')
        .value.split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    },
    hero: {
      badge: document.getElementById('f-badge').value.trim(),
      stats: stats.length ? stats : [{ value: 0, label: '—' }],
    },
    about: {
      paragraphs: [
        document.getElementById('f-about0').value.trim(),
        document.getElementById('f-about1').value.trim(),
        document.getElementById('f-about2').value.trim(),
      ].filter(Boolean),
      details: details.length ? details : [{ icon: 'circle', title: '—', subtitle: '' }],
    },
    social: {
      github: document.getElementById('f-github').value.trim(),
      linkedin: document.getElementById('f-linkedin').value.trim(),
      comeup: document.getElementById('f-comeup').value.trim(),
    },
    contact: {
      intro: document.getElementById('f-contactIntro').value.trim(),
      email: document.getElementById('f-email').value.trim(),
      whatsappDisplay: document.getElementById('f-waDisplay').value.trim(),
      whatsappE164: document.getElementById('f-waE164').value.trim().replace(/\D/g, ''),
      comeupUrl: document.getElementById('f-comeupUrl').value.trim(),
      comeupLabel: document.getElementById('f-comeupLabel').value.trim(),
      githubUrl: document.getElementById('f-githubUrl').value.trim(),
      githubDisplay: document.getElementById('f-githubDisplay').value.trim(),
    },
    footer: {
      line: document.getElementById('f-footerLine').value.trim(),
      copyright: document.getElementById('f-footerCopy').value.trim(),
    },
  };
}

async function openDashboard() {
  loginPanel.classList.add('hidden');
  dashboard.classList.remove('hidden');
  btnLogout.classList.remove('hidden');
  const site = await api('/api/admin/site');
  siteToForm(site);
}

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  showMsg('');
  const password = document.getElementById('admin-password').value;
  try {
    await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
    document.getElementById('admin-password').value = '';
    await openDashboard();
    showMsg('Connecté.', 'ok');
  } catch (err) {
    showMsg(err.message, 'err');
  }
});

btnLogout?.addEventListener('click', async () => {
  try {
    await api('/api/admin/logout', { method: 'POST' });
  } catch (_) {}
  dashboard.classList.add('hidden');
  loginPanel.classList.remove('hidden');
  btnLogout.classList.add('hidden');
  showMsg('Déconnecté.', 'ok');
});

document.getElementById('site-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  showMsg('');
  try {
    const body = formToSite();
    await api('/api/admin/site', { method: 'PUT', body: JSON.stringify(body) });
    showMsg('Informations enregistrées.', 'ok');
  } catch (err) {
    showMsg(err.message, 'err');
  }
});

(async function init() {
  try {
    const { ok } = await api('/api/admin/me');
    if (ok) await openDashboard();
  } catch (_) {
    showMsg('', '');
  }
})();
