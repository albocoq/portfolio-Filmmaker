# Sacha Films — Portfolio

Portfolio interactif du réalisateur **Sacha Films** (Málaga, Espagne). Aftermovies, clips vidéo et projets audiovisuels, avec un player custom, scroll fluide et curseur animé.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) — animations
- [Lenis](https://github.com/darkroomengineering/lenis) — smooth scroll
- [Zustand](https://zustand.docs.pmnd.rs/) — état global (curseur)

## Prérequis

- Node.js 20+
- [pnpm](https://pnpm.io/)

## Installation

```bash
pnpm install
pnpm dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande       | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Serveur de développement |
| `pnpm build`   | Build de production      |
| `pnpm start`   | Serveur de production    |
| `pnpm lint`    | Lint ESLint              |

## Structure

```
src/
├── app/              # Pages (/, /works, /works/[slug], /contact)
├── components/       # UI (Hero, curseur, projets, vidéo…)
├── data/text.json    # Contenu des projets
├── hooks/            # Hooks React (Lenis, etc.)
├── layout/           # Header, Footer
└── stores/           # Stores Zustand
```

## Ajouter un projet

Édite `src/data/text.json`. Chaque entrée correspond à un slug (`/works/[slug]`) :

```json
{
  "Mon-Projet": {
    "title": "Mon Projet",
    "category": "aftermovie",
    "url": "https://…/video.mp4",
    "color": "#fe2653",
    "director": "SachaFilms",
    "credits": { "director": "SachaFilms", "year": "2025" },
    "sections": [
      { "title": "Overview", "content": "…" }
    ]
  }
}
```

Catégories supportées : `aftermovie`, `videoclip`.

## Déploiement

Compatible avec [Vercel](https://vercel.com/) ou tout hébergeur Node.js :

```bash
pnpm build
pnpm start
```

## Licence

Projet privé — © Sacha Films. Code source maintenu par [albocoq](https://github.com/albocoq).
