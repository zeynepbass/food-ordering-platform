import { useState } from "react";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import Seo from "@/components/common/Seo";
import DashboardLayout from "@/components/common/DashboardLayout";
import AccountSettings from "@/components/profile/AccountSettings";
import PasswordSettings from "@/components/profile/PasswordSettings";
import UserOrders from "@/components/profile/UserOrders";
import { authOptions } from "@/server/auth";
import { getUserById } from "@/server/queries";

const PROFILE_TABS = [
  { key: "account", label: "Account", icon: "fa fa-home", Component: AccountSettings },
  { key: "password", label: "Password", icon: "fa fa-key", Component: PasswordSettings },
  { key: "orders", label: "Orders", icon: "fa fa-motorcycle", Component: UserOrders },
];

const ProfilePage = ({ user }) => {
  const [activeTab, setActiveTab] = useState(PROFILE_TABS[0].key);
  const { Component } = PROFILE_TABS.find((tab) => tab.key === activeTab);

  const handleExit = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ callbackUrl: "/auth/login" });
    }
  };

  return (
    <DashboardLayout
      avatarSrc={user.image || "/images/client2.jpg"}
      name={user.fullName}
      tabs={PROFILE_TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onExit={handleExit}
    >
      <Seo title="Profile" />
      <Component user={user} />
    </DashboardLayout>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions);
  const user = await getUserById(params.id);

  if (!session || !user || user.email !== session.user.email.toLowerCase()) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  return { props: { user } };
};

export default ProfilePage;
