import { FiCheck, FiCheckCircle, FiClock, FiCreditCard, FiTruck } from "react-icons/fi";
import { DELIVERED_STATUS } from "@/constants/order";

// The first step is the confirmed order itself; the rest map to ORDER_STATUS by index.
const STEPS = [
  { label: "Order placed", Icon: FiCreditCard },
  { label: "Preparing", Icon: FiClock },
  { label: "On the way", Icon: FiTruck },
  { label: "Delivered", Icon: FiCheckCircle },
];

const stepState = (index, status) => {
  const currentStep = status + 1;
  if (index < currentStep || status === DELIVERED_STATUS) return "done";
  return index === currentStep ? "current" : "upcoming";
};

const CIRCLE_CLASSES = {
  done: "bg-success text-white",
  current: "bg-primary text-secondary ring-4 ring-primary/25",
  upcoming: "bg-slate-100 text-slate-400",
};

const OrderStatusTracker = ({ status }) => (
  <ol className="grid grid-cols-4">
    {STEPS.map(({ label, Icon }, index) => {
      const state = stepState(index, status);

      return (
        <li
          key={label}
          aria-current={state === "current" ? "step" : undefined}
          className="relative flex flex-col items-center text-center"
        >
          {index > 0 && (
            <span
              aria-hidden="true"
              className={`absolute right-1/2 top-5 h-0.5 w-full -translate-y-1/2 ${
                state === "upcoming" ? "bg-slate-200" : "bg-success"
              }`}
            />
          )}
          <span
            className={`relative z-10 grid h-10 w-10 place-content-center rounded-full ${CIRCLE_CLASSES[state]}`}
          >
            {state === "done" ? <FiCheck aria-hidden="true" /> : <Icon aria-hidden="true" />}
          </span>
          <span
            className={`mt-2 text-xs font-medium sm:text-sm ${
              state === "upcoming" ? "text-muted" : "text-secondary"
            }`}
          >
            {label}
            <span className="sr-only">
              {state === "done" ? " (completed)" : state === "current" ? " (in progress)" : ""}
            </span>
          </span>
        </li>
      );
    })}
  </ol>
);

export default OrderStatusTracker;
