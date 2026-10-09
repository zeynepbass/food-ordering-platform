import { useEffect } from "react";
import { Fraunces, Inter } from "next/font/google";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "nprogress/nprogress.css";
import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { persistCart } from "@/redux/cartStorage";
import store from "@/redux/store";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const withSiteLayout = (page) => <Layout>{page}</Layout>;

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();
  const getLayout = Component.getLayout ?? withSiteLayout;

  useEffect(() => {
    const start = () => NProgress.start();
    const done = () => NProgress.done();

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router.events]);

  useEffect(() => persistCart(store), []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div className={`${inter.variable} ${fraunces.variable} font-sans`}>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </Provider>
    </SessionProvider>
  );
};

export default App;
