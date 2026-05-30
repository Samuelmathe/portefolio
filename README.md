# Portfolio — Mumbere Mathe Samuel

Site vitrine **IoT & fullstack** : présentation, projets, CV PDF, formulaire de contact et panneau admin.

## Stack

- **Front** : HTML, CSS, JavaScript (animations, projets, références)
- **Back** : Node.js, Express, sessions admin, rate limiting, Nodemailer
- **Données** : `server/data/site.json` (contenu éditable), journal contact NDJSON

## Démarrage local

```bash
npm install
cp .env.example .env   # SESSION_SECRET, ADMIN_PASSWORD, SMTP optionnel
npm start
```

Ouvrir **http://localhost:3000** — l’API `GET /api/site` alimente les textes dynamiques.

## Liens

- **Admin** : `/admin.html` (mot de passe `ADMIN_PASSWORD`)
- **CV** : `cv.pdf` (téléchargement depuis le site)
- **Comeup** : [samuelmathr](https://comeup.com/fr/@samuelmathr)
- **LinkedIn** : [samuel-mathr](https://www.linkedin.com/in/samuel-mathr-479abb283/)

## Projets liés

| Dépôt | Rôle |
|--------|------|
| [system-quiz](https://github.com/Samuelmathe/system-quiz) | Firmware Arduino + écosystème quiz DMX |
| [macscorequiz](https://github.com/Samuelmathe/macscorequiz) | Logiciel de scores (Python) |
| [quizconfiguration](https://github.com/Samuelmathe/quizconfiguration) | Configuration DMX |
| [CarRentalFictif](https://github.com/Samuelmathe/CarRentalFictif) | [AutoLoc](https://carrentalfictif.onrender.com/) — location auto (Express + Docker) |
| [boutique-en-ligne](https://github.com/Samuelmathe/boutique-en-ligne) | Vitrine catalogue + lien vers AutoLoc |

## Licence

Usage personnel / portfolio. Contact pour réutilisation commerciale.
