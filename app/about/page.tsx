import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Golden Saffron — a taste of comfort and creativity in the heart of Bali.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <div className="container-page">
        <article className="max-w-[42rem] py-14 md:py-24">
          <p className="eyebrow">Our Story</p>

          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.03] font-light tracking-[-0.012em] md:text-[4rem]">
            A taste of comfort,{" "}
            <em className="text-saffron italic">made by hand</em>
          </h1>

          <div className="rule mt-6 w-10 md:mt-9 md:w-[3.75rem]" />

          {/* TODO(konten): ganti paragraf placeholder dengan cerita restoran asli. */}
          <div className="mt-8 space-y-5 text-[0.9375rem] leading-[1.85] text-muted md:mt-10">
            <p>
              {site.name} began with a simple idea: that the food we grew up with
              deserves to be served the way it was meant to be — slowly, with
              care, and with enough spice to be worth remembering.
            </p>
            <p>
              Our kitchen still grinds its own blends, still marinates overnight,
              and still bakes bread against the wall of a live tandoor. Nothing
              here is rushed, and nothing arrives at your table that we would not
              serve at our own.
            </p>
            <p>
              You will find us in the heart of Bali, cooking the food of our
              home for anyone who walks in — regulars, travellers, and everyone
              in between.
            </p>
          </div>
        </article>
      </div>
    </SiteLayout>
  );
}
