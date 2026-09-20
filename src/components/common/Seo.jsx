import Head from "next/head";

const Seo = ({ title }) => (
  <Head>
    <title>{title ? `${title} | Feane` : "Feane | Food Ordering"}</title>
  </Head>
);

export default Seo;
