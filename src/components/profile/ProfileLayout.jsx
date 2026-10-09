import Image from "next/image";
import { FiLogOut } from "react-icons/fi";

const tabClass = (active) =>
  `flex w-full items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
    active ? "bg-secondary text-white" : "text-secondary hover:bg-secondary-50"
  }`;

const ProfileLayout = ({ user, tabs, activeTab, onTabChange, onSignOut, children }) => (
  <div className="container grid items-start gap-6 py-10 sm:py-14 lg:grid-cols-[280px_1fr]">
    <aside className="card min-w-0 p-4">
      <div className="flex items-center gap-4 p-2 lg:flex-col lg:py-4 lg:text-center">
        <Image
          src={user.image || "/images/client2.jpg"}
          alt=""
          width={72}
          height={72}
          className="h-14 w-14 rounded-full object-cover lg:h-[72px] lg:w-[72px]"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-secondary">{user.fullName}</p>
          <p className="truncate text-sm text-muted">{user.email}</p>
        </div>
      </div>
      <nav aria-label="Profile" className="mt-2 border-t border-line pt-3">
        <ul className="flex gap-1 overflow-x-auto lg:flex-col">
          {tabs.map(({ key, label, Icon }) => (
            <li key={key}>
              <button
                type="button"
                className={tabClass(activeTab === key)}
                aria-current={activeTab === key ? "page" : undefined}
                onClick={() => onTabChange(key)}
              >
                <Icon aria-hidden="true" /> {label}
              </button>
            </li>
          ))}
          <li>
            <button type="button" className={tabClass(false)} onClick={onSignOut}>
              <FiLogOut aria-hidden="true" /> Sign out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
    <div className="card min-w-0 p-6 sm:p-8">{children}</div>
  </div>
);

export default ProfileLayout;
