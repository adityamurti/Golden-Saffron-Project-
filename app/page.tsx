import { SiteLayout } from "@/components/layout/site-layout";
import { Hero } from "@/components/home/hero";
import { SignatureDishes } from "@/components/home/signature-dishes";

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <SignatureDishes />
    </SiteLayout>
  );
}
