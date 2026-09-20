import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Seo from "@/components/common/Seo";
import DashboardLayout from "@/components/common/DashboardLayout";
import CategoryManager from "@/components/admin/CategoryManager";
import FooterSettings from "@/components/admin/FooterSettings";
import OrderManager from "@/components/admin/OrderManager";
import ProductManager from "@/components/admin/ProductManager";
import ReservationManager from "@/components/admin/ReservationManager";
import { isAdminRequest } from "@/server/guards";
import adminService from "@/services/adminService";

const ADMIN_TABS = [
  { key: "products", label: "Products", icon: "fa fa-cutlery", Component: ProductManager },
  { key: "orders", label: "Orders", icon: "fa fa-motorcycle", Component: OrderManager },
  { key: "categories", label: "Categories", icon: "fa fa-ellipsis-h", Component: CategoryManager },
  { key: "reservations", label: "Reservations", icon: "fa fa-calendar", Component: ReservationManager },
  { key: "footer", label: "Footer", icon: "fa fa-window-maximize", Component: FooterSettings },
];

const AdminProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(ADMIN_TABS[0].key);
  const { Component } = ADMIN_TABS.find((tab) => tab.key === activeTab);

  const handleExit = async () => {
    if (!confirm("Are you sure you want to close your Admin Account?")) return;

    try {
      await adminService.logout();
      toast.success("Admin account closed!");
      router.push("/admin");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <DashboardLayout
      avatarSrc="/images/admin.png"
      name="Admin"
      tabs={ADMIN_TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onExit={handleExit}
    >
      <Seo title="Admin" />
      <Component />
    </DashboardLayout>
  );
};

export const getServerSideProps = async ({ req }) => {
  if (!isAdminRequest(req)) {
    return { redirect: { destination: "/admin", permanent: false } };
  }
  return { props: {} };
};

export default AdminProfilePage;
