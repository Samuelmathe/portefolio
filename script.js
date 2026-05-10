// =========================================================
// DONNÉES PROJETS - À MODIFIER AVEC TES VRAIS PROJETS
// =========================================================
const projects = [
    {
        id: 1,
        title: "Système Quiz Événementiel",
        category: "iot",
        categoryLabel: "IoT / Embarqué",
        emoji: "🎮",
        image: "", // Mettre le chemin de ta photo ici
        description: "Système de quiz professionnel avec 30 buzzers radio, 30 projecteurs DMX512 contrôlés en temps réel. Architecture Arduino Mega + Nano avec communication nRF24L01 PA+LNA. Livré à un client en France pour des événements.",
        longDescription: `
            <h3>Système Quiz Événementiel Complet</h3>
            <p>Un système professionnel de quiz clé en main livré pour un client français spécialisé dans l'animation d'événements.</p>
            <h4>Architecture technique</h4>
            <ul>
                <li>Arduino Mega avec shield DMX512 comme contrôleur central</li>
                <li>30 Nano buzzers avec radio nRF24L01 PA+LNA</li>
                <li>Nano son autonome avec DFPlayer Mini</li>
                <li>Nano animateur pour validation/refus</li>
                <li>Communication radio sur canal 108 (2508 MHz, hors WiFi)</li>
                <li>EEPROM configurable pour 30 équipes × 30 projecteurs</li>
                <li>Watchdog timer + Magic Number pour robustesse</li>
                <li>Gestion buzz simultanés avec fenêtre de priorité 50ms</li>
            </ul>
            <h4>Logiciels livrés</h4>
            <ul>
                <li>Logiciel scores Python/DearPyGUI multiplateforme</li>
                <li>Logiciel configuration DMX Python</li>
                <li>Compatible Windows, Mac, Linux</li>
                <li>Compilation automatique GitHub Actions</li>
            </ul>
            <p>Dépôt principal : firmware Arduino + structure du projet (interfaces Python intégrées). Dépôts dédiés : <a href="https://github.com/Samuelmathe/macscorequiz" target="_blank" rel="noopener">scores</a>, <a href="https://github.com/Samuelmathe/quizconfiguration" target="_blank" rel="noopener">configuration DMX</a>.</p>
        `,
        tags: ["Arduino", "C++", "DMX512", "nRF24L01", "Python", "DearPyGUI"],
        github: "https://github.com/Samuelmathe/system-quiz",
        demo: "",
        client: "Client France"
    },
    {
        id: 2,
        title: "Plateforme Location & Événements",
        category: "web",
        categoryLabel: "Web / Django",
        emoji: "🌐",
        image: "",
        description: "Application web complète Django pour la location de matériel événementiel et la gestion de prestations. Paiement Stripe, calendrier réactif, espace admin et client, factures PDF automatiques.",
        longDescription: `
            <h3>Plateforme Web Django Complète</h3>
            <p>Application web full-stack pour un prestataire événementiel français, avec paiement en ligne et gestion complète des réservations.</p>
            <h4>Fonctionnalités côté client</h4>
            <ul>
                <li>Catalogue prestations avec photos Cloudinary et vidéos YouTube</li>
                <li>Location matériel avec panier et paiement Stripe sécurisé</li>
                <li>Calendrier disponibilités temps réel (FullCalendar)</li>
                <li>Espace client avec historique et messagerie</li>
                <li>Formulaire demande de devis</li>
            </ul>
            <h4>Fonctionnalités admin</h4>
            <ul>
                <li>Dashboard statistiques (CA, réservations, clients)</li>
                <li>Gestion catalogue complet</li>
                <li>Génération automatique factures PDF</li>
                <li>Messagerie avec les clients</li>
                <li>Calendrier des disponibilités</li>
            </ul>
            <h4>Stack technique</h4>
            <ul>
                <li>Django 4.2 + PostgreSQL</li>
                <li>Stripe Checkout + Webhooks</li>
                <li>Cloudinary (photos) + Bunny.net (vidéos)</li>
                <li>Bootstrap 5 + FullCalendar</li>
                <li>PythonAnywhere hébergement</li>
            </ul>
        `,
        tags: ["Django", "Python", "Stripe", "PostgreSQL", "Cloudinary", "Bootstrap"],
        github: "https://github.com/",
        demo: "",
        client: "Client France"
    },
    {
        id: 3,
        title: "Logiciel Scores Quiz",
        category: "logiciel",
        categoryLabel: "Logiciel Python",
        emoji: "📊",
        image: "",
        description: "Logiciel desktop multiplateforme de gestion des scores pour quiz événementiel. Interface graphique DearPyGUI avec sons pygame, connexion série automatique, 30 équipes max, compilation PyInstaller.",
        longDescription: `
            <h3>Logiciel de Scores Quiz</h3>
            <p>Application desktop professionnel pour la gestion en temps réel des scores lors d'événements quiz.</p>
            <h4>Fonctionnalités</h4>
            <ul>
                <li>Interface graphique moderne DearPyGUI</li>
                <li>Détection automatique port série (Windows/Mac/Linux)</li>
                <li>30 équipes maximum configurables</li>
                <li>Sons pygame (buzz, victoire, échec)</li>
                <li>Boutons VALIDER / REFUSER par équipe</li>
                <li>Ajout/suppression d'équipes dynamique</li>
                <li>Console de log intégrée</li>
                <li>Compatible Windows, macOS, Linux</li>
            </ul>
            <h4>Build & Distribution</h4>
            <ul>
                <li>Compilation PyInstaller en exécutable</li>
                <li>GitHub Actions CI/CD automatique</li>
                <li>Build Windows et Mac en parallèle</li>
            </ul>
        `,
        tags: ["Python", "DearPyGUI", "PyInstaller", "Pygame", "Serial", "GitHub Actions"],
        github: "https://github.com/Samuelmathe/macscorequiz",
        demo: "",
        client: "Client France"
    },
    {
        id: 4,
        title: "Logiciel Configuration DMX",
        category: "logiciel",
        categoryLabel: "Logiciel Python",
        emoji: "💡",
        image: "",
        description: "Logiciel de configuration DMX pour systèmes d'éclairage événementiel. Paramétrage des adresses DMX, couleurs RGB par équipe par projecteur, synchronisation EEPROM Arduino en temps réel.",
        longDescription: `
            <h3>Logiciel Configuration DMX</h3>
            <p>Outil de configuration professionnel pour le mapping DMX du système quiz événementiel.</p>
            <h4>Fonctionnalités</h4>
            <ul>
                <li>30 projecteurs DMX configurables</li>
                <li>30 équipes avec couleurs RGB personnalisées</li>
                <li>Adressage automatique selon nombre de canaux</li>
                <li>Patch universel (canaux Dimmer, R, G, B)</li>
                <li>Synchronisation temps réel vers Arduino EEPROM</li>
                <li>Barre de progression synchronisation</li>
                <li>Sauvegarde config en JSON local</li>
                <li>Reset config par défaut</li>
            </ul>
        `,
        tags: ["Python", "DearPyGUI", "DMX512", "Arduino", "JSON", "EEPROM"],
        github: "https://github.com/Samuelmathe/quizconfiguration",
        demo: "",
        client: "Client France"
    }
];

// Références / collaborations — modifie ce tableau dans le code (titre, texte, lien)
const portfolioReferences = [
    {
        title: 'Système quiz événementiel (DMX + radio)',
        description:
            'Ensemble Arduino Mega/Nano, nRF24L01, DMX512 et logiciels Python (scores + configuration). Livré clé en main pour un client en France.',
        url: 'https://github.com/Samuelmathe/system-quiz',
        linkLabel: 'Dépôt GitHub',
    },
    {
        title: 'Logiciel de scores quiz',
        description:
            'Interface DearPyGUI, liaison série automatique, sons pygame, jusqu’à 30 équipes — builds PyInstaller et GitHub Actions.',
        url: 'https://github.com/Samuelmathe/macscorequiz',
        linkLabel: 'Code source',
    },
    {
        title: 'Logiciel de configuration DMX',
        description:
            'Paramétrage des projecteurs et équipes, couleurs RGB, synchronisation EEPROM avec le firmware Arduino.',
        url: 'https://github.com/Samuelmathe/quizconfiguration',
        linkLabel: 'Code source',
    },
];

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function waDigits(e164) {
    const d = String(e164 || '').replace(/\D/g, '');
    return d || '0';
}

function iconClass(icon) {
    const allowed = new Set([
        'graduation-cap',
        'school',
        'map-marker-alt',
        'language',
        'briefcase',
        'star',
        'keyboard',
        'laptop-code',
    ]);
    const i = String(icon || '').toLowerCase();
    return allowed.has(i) ? i : 'circle';
}

let typedWords = ['IoT & Embarqué', 'Fullstack Django', 'Arduino & ESP32', 'Python & C++'];

function applySite(site) {
    if (!site) return;
    if (site.metaTitle) document.title = site.metaTitle;

    const el = (id) => document.getElementById(id);
    const setText = (id, v) => {
        const n = el(id);
        if (n && v != null) n.textContent = v;
    };

    setText('nav-brand-text', site.identity?.brand);
    setText('loader-brand', site.identity?.brand);
    setText('footer-brand-text', site.identity?.brand);
    setText('about-avatar-initials', site.identity?.brand);

    setText('hero-badge-text', site.hero?.badge);
    const l1 = el('hero-line1');
    const l2 = el('hero-line2');
    if (l1 && site.identity?.firstName != null) {
        l1.dataset.text = site.identity.firstName;
        l1.textContent = site.identity.firstName;
    }
    if (l2 && site.identity?.lastName != null) {
        l2.dataset.text = site.identity.lastName;
        l2.textContent = site.identity.lastName;
    }
    setText('hero-tagline-prefix', site.identity?.taglinePrefix);
    setText('hero-location-text', site.identity?.location);

    const statsEl = el('hero-stats');
    const stats = site.hero?.stats;
    if (statsEl && Array.isArray(stats) && stats.length) {
        statsEl.innerHTML = stats
            .map((s, i) => {
                const div = i > 0 ? '<div class="stat-divider"></div>' : '';
                const labelEsc = escapeHtml(s.label || '');
                const val = Number(s.value) || 0;
                return `${div}<div class="stat"><span class="stat-number" data-target="${val}">0</span><span class="stat-label">${labelEsc}</span></div>`;
            })
            .join('');
    }

    const paras = site.about?.paragraphs;
    if (Array.isArray(paras)) {
        paras.slice(0, 3).forEach((p, i) => {
            setText(`about-p${i}`, p);
        });
    }

    const det = el('about-details');
    if (det && Array.isArray(site.about?.details) && site.about.details.length) {
        det.innerHTML = site.about.details
            .map(
                (d) => `
            <div class="detail-item">
                <i class="fas fa-${iconClass(d.icon)}"></i>
                <div>
                    <strong>${escapeHtml(d.title)}</strong>
                    <span>${escapeHtml(d.subtitle)}</span>
                </div>
            </div>`,
            )
            .join('');
    }

    const soc = site.social || {};
    const setHref = (id, href) => {
        const a = el(id);
        if (a && href) a.href = href;
    };
    setHref('about-social-github', soc.github);
    setHref('about-social-linkedin', soc.linkedin);
    setHref('about-social-comeup', soc.comeup);
    setHref('footer-github', soc.github);
    setHref('footer-linkedin', soc.linkedin);
    setHref('footer-comeup', soc.comeup);

    const c = site.contact || {};
    setText('contact-intro', c.intro);

    const aEmail = el('link-email');
    if (aEmail && c.email) {
        aEmail.href = `mailto:${c.email}`;
        aEmail.textContent = c.email;
    }

    const aWa = el('link-whatsapp');
    if (aWa) {
        aWa.href = `https://wa.me/${waDigits(c.whatsappE164)}`;
        if (c.whatsappDisplay != null) aWa.textContent = c.whatsappDisplay;
    }

    const aComeup = el('link-comeup');
    if (aComeup && c.comeupUrl) {
        aComeup.href = c.comeupUrl;
        if (c.comeupLabel != null) aComeup.textContent = c.comeupLabel;
    }

    const aLi = el('link-linkedin');
    if (aLi && soc.linkedin) {
        aLi.href = soc.linkedin;
    }

    const aGh = el('link-github');
    if (aGh && c.githubUrl) {
        aGh.href = c.githubUrl;
        if (c.githubDisplay != null) aGh.textContent = c.githubDisplay;
    }

    setText('footer-line', site.footer?.line);
    setText('footer-copyright', site.footer?.copyright);

    const cv = (site.cvFilename || 'cv.pdf').replace(/[^a-zA-Z0-9._-]/g, '') || 'cv.pdf';
    ['nav-cv-link', 'mobile-cv-link', 'about-cv-link'].forEach((id) => {
        const n = el(id);
        if (n) n.setAttribute('href', cv);
    });
}

function renderPortfolioReferences() {
    const grid = document.getElementById('reviews-grid');
    const empty = document.getElementById('reviews-empty');
    if (!grid || !empty) return;
    grid.innerHTML = '';
    const list = Array.isArray(portfolioReferences) ? portfolioReferences.filter((r) => r && r.title && r.description && r.url) : [];
    if (!list.length) {
        empty.hidden = false;
        empty.textContent = 'Ajoute des entrées dans script.js (tableau portfolioReferences).';
        return;
    }
    empty.hidden = true;
    list.forEach((ref, i) => {
        const card = document.createElement('article');
        card.className = 'review-card reveal';
        card.style.animationDelay = `${i * 0.08}s`;
        const label = escapeHtml(ref.linkLabel || 'Voir le lien');
        const hrefRaw = String(ref.url).trim();
        const href = /^https?:\/\//i.test(hrefRaw) ? hrefRaw : '#';
        card.innerHTML = `
            <h3 class="review-title">${escapeHtml(ref.title)}</h3>
            <p class="review-text">${escapeHtml(ref.description)}</p>
            <div class="review-card-actions">
                <a href="${escapeHtml(href)}" ${href === '#' ? '' : 'target="_blank" rel="noopener noreferrer"'} class="btn btn-secondary review-link-btn">
                    ${label} <i class="fas fa-external-link-alt"></i>
                </a>
            </div>`;
        grid.appendChild(card);
        setTimeout(() => revealObserver.observe(card), 50);
    });

    const cur = document.getElementById('cursor');
    const fol = document.getElementById('cursor-follower');
    if (cur && fol) {
        grid.querySelectorAll('.review-card, .review-card a').forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cur.classList.add('active');
                fol.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cur.classList.remove('active');
                fol.classList.remove('active');
            });
        });
    }
}

async function boot() {
    let site = null;
    try {
        const rs = await fetch('/api/site');
        if (rs.ok) site = await rs.json();
    } catch (_) {
        /* hors serveur : garde le HTML statique */
    }
    if (site) applySite(site);
    renderPortfolioReferences();

    typedWords =
        site?.identity?.typedPhrases?.filter(Boolean)?.length > 0
            ? site.identity.typedPhrases.filter(Boolean)
            : ['IoT & Embarqué', 'Fullstack Django', 'Arduino & ESP32', 'Python & C++'];
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;
    setTimeout(typeText, 1000);

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) counterObserver.observe(heroStats);
}

// =========================================================
// CURSEUR CUSTOM
// =========================================================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .project-card, .filter-btn, .review-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });
}

// =========================================================
// LOADER
// =========================================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1800);
});

// =========================================================
// NAVBAR SCROLL
// =========================================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================================
// HAMBURGER MENU MOBILE
// =========================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// =========================================================
// TYPED TEXT
// =========================================================
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const typedEl = document.getElementById('typed');
    if (!typedEl) return;
    const list = typedWords.length ? typedWords : ['IoT'];
    const currentWord = list[wordIndex % list.length];

    if (isDeleting) {
        typedEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % list.length;
        typingSpeed = 300;
    }

    setTimeout(typeText, typingSpeed);
}

// =========================================================
// COUNTER ANIMATION
// =========================================================
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + (el.closest('.stat')?.querySelector('.stat-label')?.textContent.includes('%') ? '' : '');
    }, 16);
}

// =========================================================
// INTERSECTION OBSERVER - REVEAL ANIMATIONS
// =========================================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Observer pour les compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// =========================================================
// PARTICLES CANVAS
// =========================================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const count = Math.min(60, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.4 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
            ctx.fill();

            // Lignes entre particules proches
            particles.slice(i + 1).forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

initParticles();

// =========================================================
// RENDER PROJECTS
// =========================================================
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    grid.innerHTML = '';

    filtered.forEach((project, i) => {
        const card = document.createElement('div');
        card.className = 'project-card reveal';
        card.style.animationDelay = `${i * 0.1}s`;
        card.setAttribute('data-category', project.category);

        card.innerHTML = `
            <div class="project-image">
                ${project.image
                    ? `<img src="${project.image}" alt="${project.title}" onerror="this.parentElement.innerHTML='<span style=\\"font-size:48px\\">${project.emoji}</span>'">`
                    : `<span style="font-size: 48px; position: relative; z-index: 1;">${project.emoji}</span>`
                }
            </div>
            <div class="project-body">
                <span class="project-category">${project.categoryLabel}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.slice(0, 4).map(t => `<span class="project-tag">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" target="_blank" class="project-link" onclick="event.stopPropagation()"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                    <span class="project-link" style="margin-left:auto; cursor:pointer;"><i class="fas fa-expand"></i> Détails</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openModal(project));
        grid.appendChild(card);

        // Observer reveal
        setTimeout(() => {
            revealObserver.observe(card);
        }, 100);
    });
}

// =========================================================
// FILTRES PROJETS
// =========================================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.getAttribute('data-filter'));
    });
});

// =========================================================
// MODAL PROJET
// =========================================================
function openModal(project) {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
        <div style="margin-bottom: 24px;">
            <span style="font-size: 12px; color: var(--accent); text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">
                ${project.categoryLabel}
            </span>
            <h2 style="font-family: var(--font-display); font-size: 28px; margin-top: 8px; color: var(--text);">
                ${project.title}
            </h2>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
            ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>

        <div style="color: var(--text-muted); line-height: 1.7; margin-bottom: 24px;">
            ${project.longDescription}
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${project.github ? `
                <a href="${project.github}" target="_blank" class="btn btn-primary" style="font-size: 14px; padding: 12px 24px;">
                    <i class="fab fa-github"></i> Voir le code
                </a>
            ` : ''}
            ${project.demo ? `
                <a href="${project.demo}" target="_blank" class="btn btn-secondary" style="font-size: 14px; padding: 12px 24px;">
                    <i class="fas fa-external-link-alt"></i> Voir la démo
                </a>
            ` : ''}
            ${project.client ? `
                <span style="display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 14px;">
                    <i class="fas fa-user"></i> ${project.client}
                </span>
            ` : ''}
        </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('modal-close')?.addEventListener('click', closeModal);
document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// =========================================================
// SMOOTH SCROLL NAVBAR
// =========================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =========================================================
// CONTACT FORM
// =========================================================
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const defaultHtml = btn.innerHTML;

    const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        projectType: form.projectType.value.trim(),
        message: form.message.value.trim(),
    };

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi…';

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(data.error || 'Erreur serveur');
        }
        btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        btn.style.background = 'linear-gradient(135deg, #00FF9D, #00C878)';
        form.reset();
        setTimeout(() => {
            btn.innerHTML = defaultHtml;
            btn.style.background = '';
            btn.disabled = false;
        }, 3500);
    } catch (err) {
        btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + (err.message || 'Échec');
        btn.style.background = 'linear-gradient(135deg, #ff5555, #cc3333)';
        setTimeout(() => {
            btn.innerHTML = defaultHtml;
            btn.style.background = '';
            btn.disabled = false;
        }, 5000);
    }
});

// =========================================================
// ADD REVEAL CLASSES & INIT
// =========================================================
document.querySelectorAll('.about-grid, .skill-category, .contact-grid, .section-header').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Init projets + données dynamiques (API)
renderProjects();
boot();

console.log(`
╔═══════════════════════════════════╗
║  Mumbere Mathe Samuel             ║
║  Développeur IoT & Fullstack      ║
║  Goma, RDC 🌋                     ║
╚═══════════════════════════════════╝
`);
