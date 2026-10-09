import Seo from "@/components/common/Seo";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductById } from "@/server/queries";

// Keyed by id so size and extras reset when navigating from one product to another.
const ProductPage = ({ product }) => (
  <>
    <Seo title={product.title} description={product.desc} />
    <ProductDetail key={product._id} product={product} />
  </>
);

export const getServerSideProps = async ({ params }) => {
  const product = await getProductById(params.id);

  if (!product) {
    return { notFound: true };
  }
  return { props: { product } };
};

export default ProductPage;
