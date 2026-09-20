import Image from "next/image";

const tabClass = (active) =>
  `border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
    active ? "bg-primary text-white" : ""
  }`;

const DashboardLayout = ({
  avatarSrc,
  name,
  tabs,
  activeTab,
  onTabChange,
  onExit,
  children,
}) => (
  <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
    <aside className="lg:w-80 w-full flex-shrink-0">
      <div className="relative flex flex-col items-center px-10 py-5 border">
        <Image
          src={avatarSrc}
          alt={name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <b className="text-2xl mt-1">{name}</b>
      </div>
      <ul className="text-center font-semibold">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              type="button"
              className={tabClass(activeTab === tab.key)}
              onClick={() => onTabChange(tab.key)}
            >
              <i className={tab.icon}></i>
              <span className="ml-1">{tab.label}</span>
            </button>
          </li>
        ))}
        <li>
          <button type="button" className={tabClass(false)} onClick={onExit}>
            <i className="fa fa-sign-out"></i>
            <span className="ml-1">Exit</span>
          </button>
        </li>
      </ul>
    </aside>
    {children}
  </div>
);

export default DashboardLayout;
