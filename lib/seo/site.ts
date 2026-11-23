/**
 * Satu sumber kebenaran untuk semua data restoran.
 *
 * ATURAN: nilai NAP (name, address, phone) HARUS identik dengan Google
 * Business Profile. NAP yang tidak konsisten melemahkan sinyal local SEO.
 *
 * TODO(konten): ganti semua nilai placeholder dengan data Golden Saffron asli.
 */
export const site = {
  name: "Golden Saffron",
  tagline: "A taste of comfort and creativity",
  description:
    "Authentic Indian flavours served with warmth — slow-cooked curries, tandoor breads, and hand-layered spice blends in the heart of Bali.",

  /** Diisi lewat NEXT_PUBLIC_SITE_URL saat deploy. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** E.164 lengkap, untuk JSON-LD dan tampilan. */
  phone: "+62 812 0000 0000",

  /**
   * Digit saja, untuk wa.me. SENGAJA dipisah dari `phone`:
   * wa.me menolak "+", JSON-LD mewajibkan format internasional lengkap.
   */
  whatsapp: "6281200000000",

  address: {
    street: "Jl. Contoh No. 1",
    locality: "Kuta",
    region: "Bali",
    postalCode: "80361",
    country: "ID",
  },

  geo: { lat: -8.6503, lng: 115.2167 },

  /** mapsUrl dipakai tombol "Get Directions" dan JSON-LD hasMap. */
  mapsUrl: "https://maps.google.com/?q=-8.6503,115.2167",

  hours: [
    { day: "Monday", open: "11:00", close: "23:00" },
    { day: "Tuesday", open: "11:00", close: "23:00" },
    { day: "Wednesday", open: "11:00", close: "23:00" },
    { day: "Thursday", open: "11:00", close: "23:00" },
    { day: "Friday", open: "11:00", close: "23:00" },
    { day: "Saturday", open: "11:00", close: "23:00" },
    { day: "Sunday", open: "11:00", close: "23:00" },
  ] as const,

  socials: {
    instagram: "https://instagram.com/",
  },
} as const;

/** Format untuk tampilan, mis. "11:00 — 23:00". */
export function formatHours(open: string, close: string): string {
  return `${open} — ${close}`;
}
