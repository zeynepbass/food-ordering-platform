import Seo from "@/components/common/Seo";
import MenuWrapper from "@/components/product/MenuWrapper";
import { getCategories, getProducts } from "@/server/queries";

const MenuPage = ({ categories, products }) => (
  <div className="pt-10">
    <Seo title="Menu" />
    <MenuWrapper categories={categories} products={products} />
  </div>
);

export const getServerSideProps = async () => {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return { props: { categories, products } };
};

export default MenuPage;
