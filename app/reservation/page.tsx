import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { ReservationForm } from "@/components/reservation/reservation-form";

export const metadata: Metadata = {
  title: "Reservation",
  description:
    "Reserve a table at Golden Saffron. Fill in four details and confirm instantly over WhatsApp.",
  alternates: { canonical: "/reservation" },
};

export default function ReservationPage() {
  return (
    <SiteLayout>
      <div className="container-page">
        <div className="max-w-[42rem] py-14 md:py-24">
          <p className="eyebrow">Reservation</p>
          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.03] font-light tracking-[-0.012em] md:text-[4rem]">
            Book a <em className="text-saffron italic">table</em>
          </h1>
          <div className="rule mt-6 w-10 md:mt-9 md:w-[3.75rem]" />
          <p className="mt-6 max-w-[34rem] text-[0.875rem] leading-[1.75] text-muted md:mt-8">
            Fill in the details below and we will open WhatsApp with your
            booking already written out — no back-and-forth.
          </p>

          <ReservationForm />
        </div>
      </div>
    </SiteLayout>
  );
}
