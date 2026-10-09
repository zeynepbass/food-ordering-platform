import Link from "next/link";
import { FiCalendar, FiDollarSign, FiGrid, FiPackage, FiShoppingBag, FiTruck } from "react-icons/fi";
import DataState from "@/components/common/DataState";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { DELIVERED_STATUS } from "@/constants/order";
import useFetch from "@/hooks/useFetch";
import categoryService from "@/services/categoryService";
import orderService from "@/services/orderService";
import productService from "@/services/productService";
import reservationService from "@/services/reservationService";
import { formatDateTime, formatPrice, shortId } from "@/utils/format";

const RECENT_ORDER_COUNT = 5;

const StatCard = ({ label, value, Icon }) => (
  <div className="card flex items-center gap-4 p-5">
    <span className="grid h-11 w-11 shrink-0 place-content-center rounded-xl bg-primary-50 text-primary-700">
      <Icon size={20} aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="text-sm text-muted">{label}</p>
      <p className="truncate text-2xl font-semibold text-secondary">{value}</p>
    </div>
  </div>
);

const AdminOverview = () => {
  const orders = useFetch(orderService.getAll, []);
  const products = useFetch(productService.getAll, []);
  const categories = useFetch(categoryService.getAll, []);
  const reservations = useFetch(reservationService.getAll, []);

  const whenLoaded = (resource, getValue) =>
    resource.loading || resource.error ? "–" : getValue(resource.data);
  const count = (resource) => whenLoaded(resource, (list) => list.length);

  const stats = [
    {
      label: "Revenue",
      Icon: FiDollarSign,
      value: whenLoaded(orders, (list) =>
        formatPrice(list.reduce((sum, order) => sum + order.total, 0))
      ),
    },
    { label: "Orders", Icon: FiShoppingBag, value: count(orders) },
    {
      label: "Active orders",
      Icon: FiTruck,
      value: whenLoaded(
        orders,
        (list) => list.filter((order) => order.status < DELIVERED_STATUS).length
      ),
    },
    { label: "Products", Icon: FiPackage, value: count(products) },
    { label: "Categories", Icon: FiGrid, value: count(categories) },
    {
      label: "Upcoming reservations",
      Icon: FiCalendar,
      value: whenLoaded(
        reservations,
        (list) => list.filter((item) => new Date(item.date) >= new Date()).length
      ),
    },
  ];

  const recentOrders = orders.data.slice(0, RECENT_ORDER_COUNT);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <section className="card overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <h2 className="font-semibold text-secondary">Recent orders</h2>
          <Link
            href={{ pathname: "/admin/profile", query: { tab: "orders" } }}
            shallow
            replace
            className="text-sm font-semibold text-primary-700 hover:underline"
          >
            View all
          </Link>
        </div>
        <DataState
          loading={orders.loading}
          error={orders.error}
          onRetry={orders.refetch}
          isEmpty={recentOrders.length === 0}
          empty={{ icon: FiShoppingBag, title: "No orders yet" }}
        >
          <DataTable caption="Recent orders" headers={["Order", "Customer", "Placed", "Total", "Status"]}>
            {recentOrders.map((order) => (
              <DataRow key={order._id}>
                <DataCell className="font-semibold text-secondary">{shortId(order._id)}</DataCell>
                <DataCell>{order.customer}</DataCell>
                <DataCell>{formatDateTime(order.createdAt)}</DataCell>
                <DataCell>{formatPrice(order.total)}</DataCell>
                <DataCell>
                  <OrderStatusBadge status={order.status} />
                </DataCell>
              </DataRow>
            ))}
          </DataTable>
        </DataState>
      </section>
    </div>
  );
};

export default AdminOverview;
