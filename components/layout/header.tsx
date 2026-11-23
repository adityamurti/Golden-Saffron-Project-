"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20">
      <div className="container-page flex h-[4.875rem] items-center gap-10 md:h-[6.5rem]">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-sm font-medium tracking-brand text-ink uppercase md:gap-3.5 md:text-[1.375rem]"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid size-[1.625rem] place-items-center border border-saffron text-[8px] font-semibold tracking-[0.06em] text-saffron md:size-[1.875rem] md:text-[9px]"
          >
            GS
          </span>
          Golden Saffron
        </Link>

        <nav aria-label="Main" className="ml-auto hidden gap-9 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.6875rem] font-medium tracking-nav uppercase transition-colors ${
                  active ? "text-ink" : "text-muted-2 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/reservation"
          className="btn btn-primary ml-9 hidden px-6 py-3.5 md:inline-flex"
        >
          Reserve
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto flex flex-col gap-[5px] p-2.5 md:hidden"
        >
          <span
            className={`block h-px w-[1.375rem] bg-ink-soft transition-transform ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-[1.375rem] bg-ink-soft transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-[1.375rem] bg-ink-soft transition-transform ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-y border-hairline bg-ivory-sunk md:hidden"
        >
          <nav aria-label="Mobile" className="container-page flex flex-col py-2">
            {[...links, { href: "/reservation", label: "Reservation" }].map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-hairline-soft py-4 text-[0.6875rem] font-medium tracking-nav text-ink-soft uppercase last:border-b-0"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
