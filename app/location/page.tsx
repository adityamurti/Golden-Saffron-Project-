import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { site, formatHours } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Location",
  description:
    "Find Golden Saffron in Bali — address, opening hours, and directions.",
  alternates: { canonical: "/location" },
};

export default function LocationPage() {
  return (
    <SiteLayout>
      <div className="container-page">
        <div className="max-w-[45rem] py-14 md:py-24">
          <p className="eyebrow">Visit</p>
          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.03] font-light tracking-[-0.012em] md:text-[4rem]">
            Find us in <em className="text-saffron italic">Bali</em>
          </h1>
          <div className="rule mt-6 w-10 md:mt-9 md:w-[3.75rem]" />
        </div>

        <div className="grid gap-12 pb-16 md:grid-cols-2 md:gap-20 md:pb-24">
          <div>
            <p className="text-[0.5625rem] font-semibold tracking-label text-muted-3 uppercase">
              Address
            </p>
            <address className="mt-3 text-[0.9375rem] leading-[1.85] text-ink-soft not-italic">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region}{" "}
              {site.address.postalCode}
              <br />
              {site.address.country === "ID" ? "Indonesia" : site.address.country}
            </address>

            <p className="mt-8 text-[0.5625rem] font-semibold tracking-label text-muted-3 uppercase">
              Opening Hours
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.875rem] text-muted-2">
              {site.hours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-6">
                  <span>{entry.day}</span>
                  <span className="tabular-nums">
                    {formatHours(entry.open, entry.close)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[0.5625rem] font-semibold tracking-label text-muted-3 uppercase">
              Contact
            </p>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mt-3 block text-[0.9375rem] text-ink-soft hover:text-saffron"
            >
              {site.phone}
            </a>

            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8"
            >
              Get Directions
            </a>
          </div>

          {/* Peta placeholder: embed Google Maps butuh iframe; ditunda sampai
              koordinat asli tersedia agar tidak menampilkan lokasi salah. */}
          <div className="flex aspect-4/3 items-center justify-center border border-hairline-soft bg-ivory-sunk md:aspect-auto">
            <p className="px-6 text-center text-[0.8125rem] leading-[1.7] text-muted-3">
              Interactive map will appear once the exact address and coordinates
              are confirmed.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
