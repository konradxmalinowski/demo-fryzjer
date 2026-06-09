# Demo: Salon Fryzjerski

Działające demo strony dla salonu fryzjerskiego — zbudowane w React + TypeScript z Framer Motion.

Część portfolio [Konrad Malinowski](https://malinowski.dev) — pokazuje, jak może wyglądać strona Twojej firmy.

**Live demo:** https://konradxmalinowski.github.io/demo-fryzjer/

---

## Co pokazuje to demo

- Wieloetapowy system rezerwacji (wybór stylisty → usługa → termin → potwierdzenie)
- Galeria realizacji w układzie masonry z lightboxem i filtrowaniem po kategorii
- Karty stylistów z bio, specjalizacjami i ocenami
- Karuzela opinii klientów
- Blog o trendach i pielęgnacji włosów
- Pełna responsywność — mobile-first

## Stack

- **React 18** + TypeScript
- **Framer Motion** — animacje przejść i mikrointerakcji
- **Zustand** — zarządzanie stanem rezerwacji
- **Tailwind CSS** — stylowanie
- **Vite** — bundler

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod http://localhost:5173

## Struktura

```
src/
├── components/     # Komponenty UI
├── pages/          # Strony (Home, Stylists, Gallery, Blog, Booking)
├── store/          # Stan rezerwacji (Zustand)
└── assets/         # Zdjęcia i ikony
```

## Zainteresowany podobną stroną?

Napisz: [malinowski.konrad45@gmail.com](mailto:malinowski.konrad45@gmail.com)  
Portfolio: [malinowski.dev](https://malinowski.dev)
