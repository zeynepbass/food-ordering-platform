import Head from "next/head";
import { SITE_NAME } from "@/constants/site";

const DEFAULT_DESCRIPTION = `Order freshly prepared burgers, pizzas and drinks online, track your order and book a table at ${SITE_NAME}.`;

const Seo = ({ title, description = DEFAULT_DESCRIPTION, noindex = false }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Food Ordering`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  );
};

export default Seo;
