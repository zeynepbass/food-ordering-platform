import { ToastContainer } from "react-toastify";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const Layout = ({ children }) => (
  <>
    <Header />
    <ToastContainer />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
