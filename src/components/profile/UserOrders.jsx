import Link from "next/link";
import { FiPackage } from "react-icons/fi";
import DataState from "@/components/common/DataState";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import useFetch from "@/hooks/useFetch";
import orderService from "@/services/orderService";
import { formatDate, formatPrice, shortId } from "@/utils/format";

const UserOrders = () => {
  const { data: orders, loading, error, refetch } = useFetch(orderService.getAll, []);

  return (
    <div>
      <h1 className="section-title">Orders</h1>
      <div className="mt-6">
        <DataState
          loading={loading}
          error={error}
          onRetry={refetch}
          isEmpty={orders.length === 0}
          empty={{
            icon: FiPackage,
            title: "No orders yet",
            text: "Your orders will show up here once you place one.",
            action: (
              <Link href="/menu" className="btn btn-primary">
                Browse the menu
              </Link>
            ),
          }}
        >
          <div className="overflow-hidden rounded-xl border border-line">
            <DataTable caption="Your orders" headers={["Order", "Date", "Address", "Total", "Status"]}>
              {orders.map((order) => (
                <DataRow key={order._id}>
                  <DataCell>
                    <Link
                      href={`/order/${order._id}`}
                      className="font-semibold text-secondary underline underline-offset-2"
                    >
                      {shortId(order._id)}
                    </Link>
                  </DataCell>
                  <DataCell>{formatDate(order.createdAt)}</DataCell>
                  <DataCell className="max-w-[220px] truncate">{order.address}</DataCell>
                  <DataCell>{formatPrice(order.total)}</DataCell>
                  <DataCell>
                    <OrderStatusBadge status={order.status} />
                  </DataCell>
                </DataRow>
              ))}
            </DataTable>
          </div>
        </DataState>
      </div>
    </div>
  );
};

export default UserOrders;
