import Seo from "@/components/common/Seo";
import AboutSection from "@/components/home/AboutSection";
import Campaigns from "@/components/home/Campaigns";
import HeroSlider from "@/components/home/HeroSlider";
import Testimonials from "@/components/home/Testimonials";
import MenuWrapper from "@/components/product/MenuWrapper";
import ReservationSection from "@/components/reservation/ReservationSection";
import { getCategories, getProducts } from "@/server/queries";

const HomePage = ({ categories, products }) => (
  <>
    <Seo />
    <HeroSlider />
    <Campaigns />
    <MenuWrapper categories={categories} products={products} />
    <AboutSection />
    <ReservationSection />
    <Testimonials />
  </>
);

export const getServerSideProps = async () => {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return { props: { categories, products } };
};

export default HomePage;
