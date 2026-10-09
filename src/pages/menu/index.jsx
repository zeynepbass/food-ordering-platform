import Seo from "@/components/common/Seo";
import MenuWrapper from "@/components/product/MenuWrapper";
import { getCategories, getProducts } from "@/server/queries";

const MenuPage = ({ categories, products }) => (
  <>
    <Seo
      title="Menu"
      description="Browse the menu by category and order pizzas, burgers and drinks online."
    />
    <MenuWrapper categories={categories} products={products} headingAs="h1" />
  </>
);

export const getServerSideProps = async () => {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return { props: { categories, products } };
};

export default MenuPage;
