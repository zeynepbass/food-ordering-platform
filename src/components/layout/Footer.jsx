import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Logo from "@/components/common/Logo";
import SocialIcon, { findSocialPlatform } from "@/components/common/SocialIcon";
import { SITE_NAME } from "@/constants/site";
import useFetch from "@/hooks/useFetch";
import footerService from "@/services/footerService";

const isHttpUrl = (value) => /^https?:\/\//i.test(value ?? "");

// The location can be a map link or a plain address; an address opens a map search.
const mapLink = (location) =>
  isHttpUrl(location)
    ? location
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location ?? "")}`;

const FooterHeading = ({ children }) => (
  <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{children}</h2>
);

const Footer = () => {
  const { data } = useFetch(footerService.getAll, []);
  const footer = data[0];
  const socialLinks = footer?.socialMedia?.filter((item) => isHttpUrl(item.link)) ?? [];

  return (
    <footer className="bg-secondary text-white/70">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo className="text-white" />
            {footer?.desc && <p className="mt-3 max-w-xs text-sm">{footer.desc}</p>}
            {socialLinks.length > 0 && (
              <ul className="mt-5 flex gap-2">
                {socialLinks.map((item) => (
                  <li key={item._id}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={findSocialPlatform(item.icon)?.label ?? "Social link"}
                      className="grid h-9 w-9 place-content-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-secondary"
                    >
                      <SocialIcon icon={item.icon} size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {footer && (
            <>
              <div>
                <FooterHeading>Contact</FooterHeading>
                <ul className="mt-4 flex flex-col gap-3 text-sm">
                  <li>
                    <a
                      href={mapLink(footer.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-primary"
                    >
                      <FiMapPin aria-hidden="true" className="shrink-0" />
                      {isHttpUrl(footer.location) ? "Find us on the map" : footer.location}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${footer.phoneNumber}`}
                      className="inline-flex items-center gap-2 hover:text-primary"
                    >
                      <FiPhone aria-hidden="true" /> {footer.phoneNumber}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${footer.email}`}
                      className="inline-flex items-center gap-2 break-all hover:text-primary"
                    >
                      <FiMail aria-hidden="true" /> {footer.email}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <FooterHeading>Opening hours</FooterHeading>
                <p className="mt-4 flex items-start gap-2 text-sm">
                  <FiClock aria-hidden="true" className="mt-0.5 shrink-0" />
                  <span>
                    {footer.openingHours?.day}
                    <br />
                    {footer.openingHours?.hour}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
