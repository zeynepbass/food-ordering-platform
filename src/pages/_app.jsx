import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "nprogress/nprogress.css";
import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import store from "@/redux/store";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();

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

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
};

export default App;
