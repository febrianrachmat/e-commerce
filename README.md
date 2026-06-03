# VELDT — Fashion E-Commerce Portfolio

Premium fashion storefront built with **Next.js 16**, focused on editorial UI/UX, bilingual shopping flows, and a clear frontend architecture suitable for portfolio review.

**Live demo:** [e-commerce-eight-vert-tzera30n9h.vercel.app](https://e-commerce-eight-vert-tzera30n9h.vercel.app/en)

## Highlights

- **Editorial homepage** — hero slider, category panels, bento featured products, dark lookbook banner
- **Shop catalog** — asymmetric bento product grid, search/sort/category filters, readable typography
- **Product detail** — gallery layout, ratings, add to cart, shipping/returns copy
- **Cart & checkout** — persisted cart (Zustand), mock checkout flow, order success page
- **Auth & profile** — Fake Store login, guarded profile with local photo/name overrides
- **Admin demo** — dashboard + local product CRUD (API is read-only)
- **i18n** — English & Indonesian (`next-intl`)
- **Accessibility** — semantic landmarks, labels, focus states, loading/error patterns ([checklist](./docs/ACCESSIBILITY.md))

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui, Framer Motion |
| i18n | next-intl (`/en`, `/id`) |
| Server state | TanStack Query → [Fake Store API](https://fakestoreapi.com) |
| Client state | Zustand (cart, auth, profile, theme — persisted where needed) |
| Forms | React Hook Form + Zod |
| Deploy | Vercel (production build uses **Webpack**: `next build --webpack`) |

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install & run

```bash
git clone https://github.com/febrianrachmat/e-commerce.git
cd e-commerce
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Middleware redirects to `/en` or `/id`.

> **Windows (PowerShell):** if `npm` is blocked by execution policy, use `npm.cmd` instead (e.g. `npm.cmd run dev`).

### Environment variables

Copy the example file and adjust if needed:

```bash
cp .env.example .env.local
```

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_FAKE_STORE_API_URL` | `https://fakestoreapi.com` | Fake Store API base URL |

### Demo login

Fake Store test account (used on `/login`):

| Field | Value |
|-------|--------|
| Username | `johnd` |
| Password | `m38rmF$` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build (`--webpack` for stable Vercel deploy) |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |

## Project structure

```
src/
├── app/[locale]/              # Localized routes (home, shop, cart, admin…)
├── components/
│   ├── common/                # QueryState, MotionReveal
│   ├── features/              # Domain UI (home, products, cart, admin…)
│   ├── layout/                # Header, footer, theme/locale toggles
│   └── ui/                    # shadcn primitives
├── config/                    # site + env
├── hooks/queries/             # TanStack Query hooks
├── i18n/                      # Routing & navigation helpers
├── lib/api/                   # HTTP client + product/user/auth APIs
├── lib/admin/                 # Local admin product store (localStorage)
├── messages/                  # en.json, id.json
├── providers/                 # Query, theme, toasts
└── stores/                    # Zustand (cart, auth, profile, theme)
```

See [Architecture](./docs/ARCHITECTURE.md) for data flow, route map, and admin limitations.

## Key routes

| Path | Description |
|------|-------------|
| `/[locale]` | Editorial homepage |
| `/[locale]/products` | Shop + filters (bento grid) |
| `/[locale]/products/[id]` | Product detail |
| `/[locale]/cart` | Shopping cart |
| `/[locale]/checkout` | Mock checkout |
| `/[locale]/login` | Sign in |
| `/[locale]/profile` | Profile (auth required) |
| `/[locale]/admin` | Admin dashboard (auth required) |

## Deployment (Vercel)

1. Import the GitHub repo in [Vercel](https://vercel.com).
2. Framework preset: **Next.js** (default).
3. Build command: `npm run build` (uses Webpack via `package.json`).
4. Optional: set `NEXT_PUBLIC_FAKE_STORE_API_URL` in project env.

**Note:** Catalog and product pages load Fake Store data in the **browser** (TanStack Query) so they work reliably on Vercel. The production build uses Webpack because Turbopack + server `fetch` during static generation can fail in Vercel’s build environment.

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) — layers, data flow, fashion filter, admin model
- [Accessibility](./docs/ACCESSIBILITY.md) — audit checklist

## Repository

[github.com/febrianrachmat/e-commerce](https://github.com/febrianrachmat/e-commerce)

## Status

| Phase | Scope | Status |
|-------|--------|--------|
| 1 | Architecture — API layer, stores, routes, i18n, admin local CRUD | Done |
| 2 | Design — VELDT brand, editorial home, shop, cart/checkout, auth/profile | Done |
| 3 | Deploy — Vercel, client-side catalog fetch, bento shop grid | Done |

## License

MIT — portfolio / educational use.
