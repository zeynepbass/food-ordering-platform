import Link from "next/link";
import { FiCompass } from "react-icons/fi";
import EmptyState from "@/components/common/EmptyState";
import Seo from "@/components/common/Seo";

const NotFoundPage = () => (
  <div className="container py-20">
    <Seo title="Page not found" noindex />
    <EmptyState
      icon={FiCompass}
      title="We could not find that page"
      text="The page may have moved, or the link may be incorrect."
      action={
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      }
    />
  </div>
);

export default NotFoundPage;
