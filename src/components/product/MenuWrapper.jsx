import { useState } from "react";
import { FiCoffee } from "react-icons/fi";
import EmptyState from "@/components/common/EmptyState";
import Title from "@/components/common/Title";
import MenuItem from "@/components/product/MenuItem";

const MenuWrapper = ({ categories, products, headingAs = "h2" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = categories[activeIndex]?.title.toLowerCase();
  const visibleProducts = products.filter((product) => product.category === activeCategory);

  return (
    <section className="container py-14">
      <div className="text-center">
        <p className="eyebrow">Menu</p>
        <Title as={headingAs} className="section-title mt-3">
          Our menu
        </Title>
      </div>
      {categories.length === 0 ? (
        <EmptyState
          icon={FiCoffee}
          title="The menu is being prepared"
          text="There are no products to show yet. Please check back soon."
        />
      ) : (
        <>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category._id}
                type="button"
                aria-pressed={index === activeIndex}
                className={`btn ${index === activeIndex ? "btn-secondary" : "btn-outline"}`}
                onClick={() => setActiveIndex(index)}
              >
                {category.title}
              </button>
            ))}
          </div>
          {visibleProducts.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <MenuItem key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FiCoffee}
              title="No products in this category yet"
              text="Pick another category to keep browsing."
            />
          )}
        </>
      )}
    </section>
  );
};

export default MenuWrapper;
