import { site } from "@/lib/seo/site";
import { menu } from "@/data/menu";

/**
 * Restaurant schema untuk Google Rich Results.
 *
 * Catatan: `priceRange` dan `servesCuisine` wajib agar valid. NAP di sini
 * harus identik dengan Google Business Profile.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    servesCuisine: "Indian",
    priceRange: "$$",
    hasMap: site.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: site.hours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.day,
      opens: entry.open,
      closes: entry.close,
    })),
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "Mains",
        hasMenuItem: menu.slice(0, 6).map((dish) => ({
          "@type": "MenuItem",
          name: dish.name,
          description: dish.description,
          offers: {
            "@type": "Offer",
            price: dish.price,
            priceCurrency: "IDR",
          },
        })),
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD harus inline; tidak ada input pengguna di sini.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
