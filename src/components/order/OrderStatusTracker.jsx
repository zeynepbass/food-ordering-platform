import Image from "next/image";
import { ORDER_STATUS, ORDER_STEPS } from "@/constants/order";

const OrderStatusTracker = ({ status }) => (
  <div className="flex justify-between w-full p-10 bg-primary mt-6">
    {ORDER_STEPS.map((step, index) => (
      <div
        key={step.label}
        className={`relative flex flex-col items-center ${
          index - status === 1 && status < ORDER_STATUS.length - 1 ? "animate-pulse" : ""
        }`}
      >
        <Image
          src={step.icon}
          alt={step.label}
          width={40}
          height={40}
          className="object-contain"
        />
        <span>{step.label}</span>
      </div>
    ))}
  </div>
);

export default OrderStatusTracker;
