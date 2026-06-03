# LuxeThread — E-Commerce Portfolio (Frontend)

Fashion e-commerce frontend built to demonstrate **UI/UX**, **state management**, **responsive layout**, **API integration**, **i18n**, and **accessibility** — visual design is applied in a later phase.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **next-intl** — English / Indonesian toggle
- **TanStack Query** — Fake Store API + loading/error/retry
- **Zustand** — cart, auth, profile overrides, theme
- **React Hook Form** + **Zod**
- **Framer Motion** — ready for design phase

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — middleware redirects to `/en` or `/id`.

### Demo login (Fake Store API)

- Username: `johnd`
- Password: `m38rmF$`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Accessibility checklist](./docs/ACCESSIBILITY.md)

## Repository

Remote: [github.com/febrianrachmat/e-commerce](https://github.com/febrianrachmat/e-commerce.git)

```bash
git remote add origin https://github.com/febrianrachmat/e-commerce.git
git push -u origin main
```

## Current status

**Phase 1 — Architecture** ✅  
Routes, API layer, stores, bilingual shell, admin local CRUD, profile edit with photo (client-side).

**Phase 2 — Design** (waiting for your references)  
Brand, typography, motion, responsive polish.

## License

MIT (portfolio use)
