import Link from "next/link";
import { signatureDishes, formatPrice } from "@/data/menu";

export function SignatureDishes() {
  const dishes = signatureDishes();

  return (
    <section className="border-t border-hairline">
      <div className="container-page py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Signature</p>
            <h2 className="mt-4 font-display text-[2.25rem] leading-[1.05] font-light tracking-[-0.012em] md:text-[3.25rem]">
              What we are known for
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-[0.6875rem] font-medium tracking-nav text-muted-2 uppercase underline underline-offset-4 hover:text-ink"
          >
            Full menu
          </Link>
        </div>

        <ul className="mt-10 md:mt-12">
          {dishes.map((dish) => (
            <li key={dish.id} className="border-b border-hairline-soft py-6">
              <div className="flex items-baseline gap-3.5">
                <h3 className="font-display text-[1.5rem] font-medium md:text-[1.75rem]">
                  {dish.name}
                </h3>
                <span className="leader" />
                <span className="text-[0.875rem] font-semibold tracking-[0.05em] text-saffron">
                  {formatPrice(dish.price)}
                </span>
              </div>
              <p className="mt-2 max-w-[54ch] text-[0.8125rem] leading-[1.65] text-muted-2">
                {dish.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
