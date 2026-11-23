import { site } from "@/lib/seo/site";
import { buildGeneralMessage, buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * Sticky CTA bar (mobile only).
 *
 * Dua tombol konversi utama. `pb` body di globals.css memberi ruang
 * setinggi bar ini agar tidak menutupi footer.
 */
export function MobileCtaBar() {
  const whatsappHref = buildWhatsAppLink({
    whatsapp: site.whatsapp,
    message: buildGeneralMessage(),
  });

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-hairline bg-ivory/95 px-3.5 pt-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary min-w-0 flex-1 px-2 text-[0.59375rem] tracking-[0.05em]"
      >
        Reserve via WhatsApp
      </a>
      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost min-w-0 flex-1 px-2 text-[0.59375rem] tracking-[0.05em]"
      >
        Directions
      </a>
    </div>
  );
}
