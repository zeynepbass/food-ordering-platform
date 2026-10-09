import { useRouter } from "next/router";
import { FiCalendar, FiGrid, FiHome, FiLayout, FiPackage, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverview";
import CategoryManager from "@/components/admin/CategoryManager";
import FooterSettings from "@/components/admin/FooterSettings";
import OrderManager from "@/components/admin/OrderManager";
import ProductManager from "@/components/admin/ProductManager";
import ReservationManager from "@/components/admin/ReservationManager";
import Seo from "@/components/common/Seo";
import { isAdminRequest } from "@/server/guards";
import adminService from "@/services/adminService";

const ADMIN_TABS = [
  { key: "overview", label: "Overview", Icon: FiHome, Component: AdminOverview },
  { key: "products", label: "Products", Icon: FiPackage, Component: ProductManager },
  { key: "orders", label: "Orders", Icon: FiShoppingBag, Component: OrderManager },
  { key: "categories", label: "Categories", Icon: FiGrid, Component: CategoryManager },
  { key: "reservations", label: "Reservations", Icon: FiCalendar, Component: ReservationManager },
  { key: "footer", label: "Footer", Icon: FiLayout, Component: FooterSettings },
];

const AdminDashboardPage = () => {
  const router = useRouter();
  const activeTab = ADMIN_TABS.find((tab) => tab.key === router.query.tab) ?? ADMIN_TABS[0];
  const { Component } = activeTab;

  const handleSignOut = async () => {
    try {
      await adminService.logout();
      await router.push("/admin");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AdminLayout
      tabs={ADMIN_TABS}
      activeTab={activeTab.key}
      title={activeTab.label}
      onSignOut={handleSignOut}
    >
      <Seo title={`${activeTab.label} · Admin`} noindex />
      <Component />
    </AdminLayout>
  );
};

AdminDashboardPage.getLayout = (page) => page;

export const getServerSideProps = async ({ req }) => {
  if (!isAdminRequest(req)) {
    return { redirect: { destination: "/admin", permanent: false } };
  }
  return { props: {} };
};

export default AdminDashboardPage;
