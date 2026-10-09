import Seo from "@/components/common/Seo";
import ReservationSection from "@/components/reservation/ReservationSection";

const ReservationPage = () => (
  <>
    <Seo title="Book a Table" description="Reserve a table in less than a minute." />
    <ReservationSection headingAs="h1" />
  </>
);

export default ReservationPage;
