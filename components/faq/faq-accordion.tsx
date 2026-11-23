import { faq } from "@/data/faq";

/**
 * Accordion pakai <details>/<summary> native:
 * keyboard, screen reader, dan no-JS semuanya jalan tanpa library.
 */
export function FaqAccordion() {
  return (
    <div className="border-t border-hairline-soft">
      {faq.map((item) => (
        <details key={item.id} className="group border-b border-hairline-soft">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 marker:hidden [&::-webkit-details-marker]:hidden">
            <h2 className="font-display text-[1.25rem] font-medium md:text-[1.5rem]">
              {item.question}
            </h2>
            <span
              aria-hidden="true"
              className="relative mt-1 block size-3 shrink-0"
            >
              <span className="absolute top-1/2 left-0 block h-px w-3 bg-saffron" />
              <span className="absolute top-1/2 left-0 block h-px w-3 rotate-90 bg-saffron transition-transform duration-200 group-open:rotate-0" />
            </span>
          </summary>
          <p className="max-w-[60ch] pb-6 text-[0.875rem] leading-[1.75] text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
