import { formatPrice } from "@/utils/format";

const describeOptions = (item) => [item.size, ...item.extras].filter(Boolean).join(" · ");

const OrderItems = ({ items = [], compact = false, className = "" }) => {
  if (items.length === 0) {
    return <span className="text-xs text-muted">Not recorded</span>;
  }

  return (
    <ul className={`flex flex-col ${compact ? "gap-1" : "divide-y divide-line"} ${className}`}>
      {items.map((item, index) => {
        const options = describeOptions(item);

        return (
          <li
            key={`${item.productId}-${index}`}
            className={compact ? "text-sm" : "flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"}
          >
            <span>
              <span className="font-medium text-secondary">
                {item.quantity} × {item.title}
              </span>
              {options && (
                <span className={`text-muted ${compact ? "ml-1 text-xs" : "block text-sm"}`}>
                  {options}
                </span>
              )}
            </span>
            {!compact && (
              <span className="font-medium text-secondary">
                {formatPrice(item.price * item.quantity)}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default OrderItems;
