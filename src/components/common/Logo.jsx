import Link from "next/link";
import { SITE_NAME } from "@/constants/site";

const Logo = ({ className = "" }) => (
  <Link
    href="/"
    aria-label={`${SITE_NAME} home`}
    className={`font-display text-2xl font-semibold tracking-tight ${className}`}
  >
    {SITE_NAME}
    <span className="text-primary">.</span>
  </Link>
);

export default Logo;
