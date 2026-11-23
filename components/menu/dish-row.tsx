import { formatPrice, type Dish } from "@/data/menu";

export function DishRow({ dish }: { dish: Dish }) {
  return (
    <li className="border-b border-hairline-soft py-5 md:py-6">
      <div className="flex items-baseline gap-3.5">
        <h3 className="font-display text-[1.375rem] font-medium md:text-[1.75rem]">
          {dish.name}
        </h3>
        {dish.signature ? (
          <span className="hidden border border-saffron-line px-2 py-1 text-[0.5rem] font-semibold tracking-[0.22em] text-saffron uppercase sm:inline-block">
            Signature
          </span>
        ) : null}
        <span className="leader" />
        <span className="text-[0.875rem] font-semibold tracking-[0.05em] text-saffron">
          {formatPrice(dish.price)}
        </span>
      </div>
      <p className="mt-2 max-w-[54ch] text-[0.8125rem] leading-[1.65] text-muted-2">
        {dish.description}
      </p>
    </li>
  );
}
