import { categoryLabels, categoryOrder, dishesByCategory } from "@/data/menu";
import { DishRow } from "./dish-row";

export function MenuList() {
  return (
    <div className="container-page pb-20 md:pb-28">
      <div className="max-w-[55rem]">
        {categoryOrder.map((category) => {
          const dishes = dishesByCategory(category);
          if (dishes.length === 0) return null;

          return (
            <section key={category} className="mt-12 first:mt-0 md:mt-14">
              <h2 className="text-[0.625rem] font-semibold tracking-[0.36em] text-muted-3 uppercase">
                {categoryLabels[category]}
              </h2>
              <ul className="mt-3">
                {dishes.map((dish) => (
                  <DishRow key={dish.id} dish={dish} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
