import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { FaqAccordion } from "@/components/faq/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about reservations, dietary options, spice levels, and visiting Golden Saffron.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <SiteLayout>
      <div className="container-page">
        <header className="max-w-[42rem] py-14 md:py-24">
          <p className="eyebrow">Questions</p>
          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.03] font-light tracking-[-0.012em] md:text-[4rem]">
            Everything you might <em className="text-saffron italic">ask</em>
          </h1>
          <div className="rule mt-6 w-10 md:mt-9 md:w-[3.75rem]" />
        </header>

        <div className="max-w-[48rem] pb-16 md:pb-24">
          <FaqAccordion />
        </div>
      </div>
    </SiteLayout>
  );
}
