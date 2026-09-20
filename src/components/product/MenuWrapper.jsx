import { useMemo, useState } from "react";
import Title from "@/components/common/Title";
import MenuItem from "@/components/product/MenuItem";

const MenuWrapper = ({ categories, products }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleProducts = useMemo(() => {
    const activeCategory = categories[activeIndex]?.title.toLowerCase();
    return products.filter((product) => product.category === activeCategory);
  }, [categories, products, activeIndex]);

  return (
    <section className="container mx-auto mb-16">
      <div className="flex flex-col items-center w-full">
        <Title addClass="text-[40px]">Our Menu</Title>
        <div className="mt-10 flex flex-wrap justify-center">
          {categories.map((category, index) => (
            <button
              key={category._id}
              type="button"
              className={`px-6 py-2 rounded-3xl ${
                index === activeIndex ? "bg-secondary text-white" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[450px]">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <MenuItem key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center font-semibold">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default MenuWrapper;
