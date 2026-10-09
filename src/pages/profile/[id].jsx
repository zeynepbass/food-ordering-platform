import { useState } from "react";
import { signOut } from "next-auth/react";
import { FiKey, FiPackage, FiUser } from "react-icons/fi";
import Seo from "@/components/common/Seo";
import AccountSettings from "@/components/profile/AccountSettings";
import PasswordSettings from "@/components/profile/PasswordSettings";
import ProfileLayout from "@/components/profile/ProfileLayout";
import UserOrders from "@/components/profile/UserOrders";
import { getSessionEmail } from "@/server/guards";
import { getUserById } from "@/server/queries";

const PROFILE_TABS = [
  { key: "account", label: "Account", Icon: FiUser, Component: AccountSettings },
  { key: "password", label: "Password", Icon: FiKey, Component: PasswordSettings },
  { key: "orders", label: "Orders", Icon: FiPackage, Component: UserOrders },
];

const ProfilePage = ({ user }) => {
  const [activeTab, setActiveTab] = useState(PROFILE_TABS[0].key);
  const { Component } = PROFILE_TABS.find((tab) => tab.key === activeTab);

  return (
    <ProfileLayout
      user={user}
      tabs={PROFILE_TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={() => signOut({ callbackUrl: "/auth/login" })}
    >
      <Seo title="Profile" noindex />
      <Component user={user} />
    </ProfileLayout>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  const email = await getSessionEmail(req, res);
  const user = email ? await getUserById(params.id) : null;

  if (!user || user.email !== email) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  return { props: { user } };
};

export default ProfilePage;
