import Seo from "@/components/common/Seo";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductById } from "@/server/queries";

const ProductPage = ({ product }) => (
  <>
    <Seo title={product.title} />
    <ProductDetail product={product} />
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
