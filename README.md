# VELDT — E-Commerce Portfolio (Frontend)

Premium fashion e-commerce frontend showcasing **UI/UX**, **state management**, **responsive layout**, **API integration**, **i18n**, and **accessibility**.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **next-intl** — English / Indonesian
- **TanStack Query** — Fake Store API + loading/error/retry
- **Zustand** — cart, auth, profile overrides, theme
- **React Hook Form** + **Zod**
- **Framer Motion** — scroll reveals & micro-interactions

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

## Project status

**Phase 1 — Architecture** ✅  
Routes, API layer, stores, bilingual shell, admin local CRUD, profile edit with photo.

**Phase 2 — Design (VELDT)** ✅  
Editorial fashion brand, homepage, shop, cart/checkout, auth/profile, admin polish.

## License

MIT (portfolio use)
