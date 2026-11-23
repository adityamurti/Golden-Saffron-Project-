import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { MenuList } from "@/components/menu/menu-list";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Slow-cooked curries, tandoor breads, and hand-layered spice blends. Full menu with prices.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <SiteLayout>
      <div className="container-page">
        <header className="max-w-[45rem] py-14 md:py-24">
          <p className="eyebrow">The Menu</p>
          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.03] font-light tracking-[-0.012em] md:text-[4rem]">
            Slow-cooked, <em className="text-saffron italic">layered by hand</em>
          </h1>
          <div className="rule mt-6 w-10 md:mt-9 md:w-[3.75rem]" />
        </header>
      </div>

      <MenuList />
    </SiteLayout>
  );
}
