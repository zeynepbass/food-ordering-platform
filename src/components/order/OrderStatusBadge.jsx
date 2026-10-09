import { ORDER_STATUS } from "@/constants/order";

const BADGE_CLASSES = ["badge-warning", "badge-info", "badge-success"];

const OrderStatusBadge = ({ status }) => (
  <span className={`badge ${BADGE_CLASSES[status] ?? "badge-neutral"}`}>
    {ORDER_STATUS[status] ?? "Unknown"}
  </span>
);

export default OrderStatusBadge;
