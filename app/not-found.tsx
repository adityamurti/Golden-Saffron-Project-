import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="container-page">
        <div className="max-w-[34rem] py-20 md:py-32">
          <p className="eyebrow">404</p>
          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.03] font-light tracking-[-0.012em] md:text-[4rem]">
            This page is <em className="text-saffron italic">not on the menu</em>
          </h1>
          <div className="rule mt-6 w-10 md:mt-9 md:w-[3.75rem]" />
          <p className="mt-6 text-[0.875rem] leading-[1.75] text-muted">
            The page you are looking for does not exist or has moved.
          </p>
          <Link href="/" className="btn btn-primary mt-8">
            Back to Home
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
