import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const Layout = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-secondary"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
