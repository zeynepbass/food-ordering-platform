import Link from "next/link";
import { FiExternalLink, FiLogOut } from "react-icons/fi";
import Logo from "@/components/common/Logo";

const tabClass = (active) =>
  `flex items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
    active ? "bg-primary text-secondary" : "text-white/70 hover:bg-white/10 hover:text-white"
  }`;

const AdminLayout = ({ tabs, activeTab, title, onSignOut, children }) => (
  <div className="min-h-screen lg:flex">
    <aside className="bg-secondary-900 text-white lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex h-16 items-center gap-3 px-5">
        <Logo />
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/70">
          Admin
        </span>
      </div>
      <nav aria-label="Admin sections">
        <ul className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col">
          {tabs.map(({ key, label, Icon }) => (
            <li key={key}>
              <Link
                href={{ pathname: "/admin/profile", query: { tab: key } }}
                shallow
                replace
                className={tabClass(activeTab === key)}
                aria-current={activeTab === key ? "page" : undefined}
              >
                <Icon aria-hidden="true" /> {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
    <div className="min-w-0 flex-1 lg:pl-64">
      <header className="flex h-16 items-center justify-between gap-4 border-b border-line bg-white px-4 sm:px-8">
        <h1 className="truncate font-display text-xl font-semibold text-secondary">{title}</h1>
        <div className="flex items-center gap-2">
          <Link href="/" className="btn btn-sm btn-outline">
            <FiExternalLink aria-hidden="true" /> <span className="hidden sm:inline">View site</span>
            <span className="sr-only sm:hidden">View site</span>
          </Link>
          <button type="button" className="btn btn-sm btn-secondary" onClick={onSignOut}>
            <FiLogOut aria-hidden="true" /> Sign out
          </button>
        </div>
      </header>
      <main className="p-4 sm:p-8">{children}</main>
    </div>
  </div>
);

export default AdminLayout;
