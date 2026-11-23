# Golden Saffron

Official website repository for Golden Saffron — an Indian cuisine restaurant
offering *a taste of comfort and creativity*. Features a digital menu, the
restaurant story, location and maps, and WhatsApp-based reservations.

## Stack

| | |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript, strict + `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS 4 |
| Fonts | Cormorant Garamond + Inter via `next/font` |
| Tests | Vitest |
| Runtime deps | `next`, `react`, `react-dom` only |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm test         # vitest run
pnpm type-check   # tsc --noEmit
pnpm lint         # eslint
pnpm build        # production build
```

## How reservations work

There is **no backend**. The reservation form collects four fields and builds a
`wa.me` deep link with the message pre-filled. The restaurant confirms on
WhatsApp — the channel they already use every day.

All WhatsApp links go through `lib/whatsapp.ts`. Never write `wa.me` in a
component:

```ts
import { buildWhatsAppLink } from "@/lib/whatsapp";

const href = buildWhatsAppLink({ whatsapp: site.whatsapp, message: "..." });
```

`buildReservationMessage()` intentionally produces **Indonesian** text: the
reader is restaurant staff, not the guest. This is the only Indonesian copy on
the site.

## Project structure

```
app/                 routes (all statically prerendered)
  layout.tsx         fonts, metadata, JSON-LD
  page.tsx           home
  menu|about|location|reservation|faq/
  sitemap.ts robots.ts icon.svg not-found.tsx

components/
  layout/            header, footer, mobile-cta-bar, site-layout
  home/              hero, signature-dishes
  menu/              menu-list, dish-row
  faq/               faq-accordion (native <details>)
  reservation/       reservation-form
  seo/               json-ld

lib/
  whatsapp.ts        single source for all WhatsApp links (+ tests)
  seo/site.ts        NAP — name, address, phone, hours, geo

data/
  menu.ts            dishes + formatPrice()
  faq.ts             FAQ entries

mockups/             reference designs (not part of the build)
```

## Theme — "Ivory Quiet"

Tokens live in `app/globals.css` under `@theme`. Extracted from
`mockups/b-desktop.html`.

Rules, in order of how easily they get broken:

1. **Saffron is never a button background.** It is used only for eyebrow text,
   `<em>` inside headings, prices, and 1px rules. Primary buttons are `--color-ink`
   (contrast 16:1, AAA). Saffron on ivory is only 3.4:1 — fails for normal text.
2. **Body copy is `--color-muted`, never `--color-ink`.** Hierarchy comes from
   colour, not just size.
3. **No shadows, no border-radius.** The theme is flat and ruled.
4. **Hairlines:** `--color-hairline` for section dividers,
   `--color-hairline-soft` for menu row dividers.

## Content that still needs replacing

Everything in `lib/seo/site.ts` and `data/menu.ts` is placeholder. Before going
live, replace:

- [ ] Official name + tagline
- [ ] Full address + map coordinates (`site.address`, `site.geo`)
- [ ] Active WhatsApp number (`site.whatsapp`, digits only, no `+`)
- [ ] Opening hours per day
- [ ] Menu items + prices
- [ ] Logo, Instagram, restaurant story (`app/about/page.tsx`)

**NAP must match Google Business Profile exactly.** Inconsistent NAP weakens
local SEO, and the whole point of this site is GBP visibility.

Set `NEXT_PUBLIC_SITE_URL` in production so sitemap, canonical URLs, and OG tags
use the real domain instead of `localhost:3000`.

## Known gaps

| Gap | Why |
| --- | --- |
| No photo | Design is text-forward until professional photography exists |
| No gallery page | Deferred; an empty gallery is worse than none |
| Map placeholder on `/location` | Waits for real coordinates to avoid showing a wrong pin |
| No error boundaries | Static site, no fetch/DB/auth — runtime errors are near-impossible |
| No CMS | Owner cannot edit the menu; ~2–3 changes/year expected |
