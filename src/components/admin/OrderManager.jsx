import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import DataState from "@/components/common/DataState";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import OrderItems from "@/components/order/OrderItems";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { DELIVERED_STATUS, ORDER_STATUS, PAYMENT_METHODS } from "@/constants/order";
import useFetch from "@/hooks/useFetch";
import orderService from "@/services/orderService";
import { formatDateTime, formatPrice, shortId } from "@/utils/format";

const ALL = "all";

const OrderManager = () => {
  const { data: orders, setData, loading, error, refetch } = useFetch(orderService.getAll, []);
  const [filter, setFilter] = useState(ALL);
  const [updatingId, setUpdatingId] = useState(null);

  const filters = [
    { key: ALL, label: "All", count: orders.length },
    ...ORDER_STATUS.map((label, status) => ({
      key: status,
      label,
      count: orders.filter((order) => order.status === status).length,
    })),
  ];

  const visibleOrders = filter === ALL ? orders : orders.filter((order) => order.status === filter);

  const handleNextStage = async (order) => {
    setUpdatingId(order._id);
    try {
      const updated = await orderService.updateStatus(order._id, order.status + 1);
      setData((current) => current.map((item) => (item._id === updated._id ? updated : item)));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter orders by status">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            className={`btn btn-sm ${filter === key ? "btn-secondary" : "btn-outline"}`}
            onClick={() => setFilter(key)}
          >
            {label} <span className="opacity-70">{count}</span>
          </button>
        ))}
      </div>
      <div className="card overflow-hidden">
        <DataState
          loading={loading}
          error={error}
          onRetry={refetch}
          isEmpty={visibleOrders.length === 0}
          empty={{
            icon: FiShoppingBag,
            title: filter === ALL ? "No orders yet" : "No orders with this status",
          }}
        >
          <DataTable
            caption="Orders"
            headers={["Order", "Customer", "Items", "Placed", "Total", "Status", "Actions"]}
          >
            {visibleOrders.map((order) => (
              <DataRow key={order._id}>
                <DataCell className="font-semibold text-secondary">{shortId(order._id)}</DataCell>
                <DataCell>
                  <span className="block font-medium text-secondary">{order.customer}</span>
                  <span className="block text-xs text-muted">{order.email}</span>
                </DataCell>
                <DataCell className="min-w-[220px] !whitespace-normal">
                  <OrderItems items={order.items} compact />
                  <span className="mt-1 block text-xs text-muted">{order.address}</span>
                </DataCell>
                <DataCell>{formatDateTime(order.createdAt)}</DataCell>
                <DataCell>
                  <span className="block font-medium text-secondary">
                    {formatPrice(order.total)}
                  </span>
                  <span className="block text-xs text-muted">{PAYMENT_METHODS[order.method]}</span>
                </DataCell>
                <DataCell>
                  <OrderStatusBadge status={order.status} />
                </DataCell>
                <DataCell>
                  {order.status < DELIVERED_STATUS ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => handleNextStage(order)}
                      disabled={updatingId === order._id}
                    >
                      Mark as {ORDER_STATUS[order.status + 1].toLowerCase()}
                    </button>
                  ) : (
                    <span className="text-xs text-muted">Completed</span>
                  )}
                </DataCell>
              </DataRow>
            ))}
          </DataTable>
        </DataState>
      </div>
    </div>
  );
};

export default OrderManager;
