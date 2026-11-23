import Link from "next/link";
import { site, formatHours } from "@/lib/seo/site";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
  { href: "/reservation", label: "Reservation" },
  { href: "/faq", label: "FAQ" },
] as const;

export function Footer() {
  const today = site.hours[0];

  return (
    <footer className="border-t border-hairline bg-ivory-sunk">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3 md:gap-16 md:py-16">
        <div>
          <p className="font-display text-[1.375rem] font-medium tracking-brand uppercase">
            {site.name}
          </p>
          <p className="mt-4 max-w-[26ch] text-[0.875rem] leading-[1.8] text-muted">
            {site.tagline}
          </p>
          {site.socials.instagram ? (
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-[0.6875rem] font-medium tracking-nav text-muted-2 uppercase underline underline-offset-4 hover:text-ink"
            >
              Instagram
            </a>
          ) : null}
        </div>

        <div>
          <p className="text-[0.5625rem] font-semibold tracking-label text-muted-3 uppercase">
            Explore
          </p>
          <nav aria-label="Footer" className="mt-4 flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.8125rem] text-muted-2 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[0.5625rem] font-semibold tracking-label text-muted-3 uppercase">
            Visit
          </p>
          <address className="mt-4 text-[0.8125rem] leading-[1.8] text-muted-2 not-italic">
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region}{" "}
            {site.address.postalCode}
          </address>
          <p className="mt-3 text-[0.8125rem] text-muted-2">
            {today ? formatHours(today.open, today.close) : null} daily
          </p>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="mt-3 inline-block text-[0.8125rem] text-muted-2 hover:text-ink"
          >
            {site.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-page flex flex-col gap-2 py-5 text-[0.625rem] tracking-label text-muted-3 uppercase md:flex-row md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Prices in IDR, subject to 10% tax</span>
        </div>
      </div>
    </footer>
  );
}
