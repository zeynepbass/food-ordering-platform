import { FiInbox } from "react-icons/fi";

const EmptyState = ({ icon: Icon = FiInbox, title, text, action }) => (
  <div className="flex flex-col items-center px-4 py-12 text-center">
    <span className="grid h-12 w-12 place-content-center rounded-full bg-primary-50 text-primary-700">
      <Icon size={22} aria-hidden="true" />
    </span>
    <p className="mt-4 font-semibold text-secondary">{title}</p>
    {text && <p className="mt-1 max-w-sm text-sm text-muted">{text}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
