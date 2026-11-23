import Link from "next/link";
import { site } from "@/lib/seo/site";
import { buildGeneralMessage, buildWhatsAppLink } from "@/lib/whatsapp";

export function Hero() {
  const whatsappHref = buildWhatsAppLink({
    whatsapp: site.whatsapp,
    message: buildGeneralMessage(),
  });

  return (
    <section className="container-page">
      {/* max-w membatasi konten supaya ruang kosong kanan terasa disengaja,
          bukan kebetulan. Slot foto 4:5 disiapkan untuk nanti. */}
      <div className="max-w-[45rem] py-16 md:py-28 lg:py-36">
        <p className="eyebrow">Indian Cuisine · Bali</p>

        <h1 className="mt-7 font-display text-[3.125rem] leading-[1.02] font-light tracking-[-0.01em] md:mt-8 md:text-[5.5rem] md:leading-none">
          Authentic Indian flavours, served{" "}
          <em className="text-saffron italic">with warmth</em>
        </h1>

        <div className="rule mt-6 w-10 md:mt-10 md:w-[3.75rem]" />

        <p className="mt-6 max-w-[32rem] text-[0.875rem] leading-[1.75] text-muted md:mt-10 md:text-base md:leading-[1.85]">
          {site.description}
        </p>

        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row md:mt-12">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Reserve via WhatsApp
          </a>
          <Link href="/menu" className="btn btn-ghost">
            View the Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
