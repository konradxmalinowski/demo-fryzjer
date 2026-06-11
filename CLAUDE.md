# CLAUDE.md — demo-fryzjer

Context for AI agents working in this repository.

## What this is

A portfolio demo website for a hair salon, part of Konrad Malinowski's freelance
portfolio (http://konrad.malinowski.ct8.pl). It is a static frontend with mock data —
there is **no backend**; bookings and reviews are simulated client-side.

- **Live demo:** https://konradxmalinowski.github.io/demo-fryzjer/
- Site copy is in **Polish** (target audience: Polish local businesses).

## Stack

- React 19 + TypeScript, bundled with Vite (`vite-ssg` for static generation)
- React Router 7 for routing
- Zustand for booking-flow state
- React Hook Form + Zod for form validation
- Framer Motion for animations, Embla Carousel, Leaflet map, lucide-react icons
- Tailwind CSS 3 for styling
- Vitest for tests, ESLint (flat config) for linting

## Commands

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run lint       # eslint .
npm test           # vitest run
npm run preview    # preview production build
```

## Structure

```
src/
├── components/    # UI components (booking/, gallery/, home/, layout/, team/, demo/)
├── pages/         # Pages: Home, Stylists, Gallery, Blog, Booking
├── routes/        # Route definitions
├── store/         # Zustand booking store
├── hooks/         # Custom hooks
├── data/          # Mock data (stylists, services, gallery, blog posts)
├── constants/     # Shared constants
└── __tests__/     # Vitest tests
```

## Conventions & constraints

- Mock data only — do not add real API calls or backends; this is a showcase.
- Mobile-first; keep Core Web Vitals in mind (lazy images, code-split routes).
- Deployed to GitHub Pages under the `/demo-fryzjer/` base path — keep asset URLs base-aware.
- Conventional Commits, English, imperative mood.
