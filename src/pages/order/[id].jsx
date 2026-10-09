import Link from "next/link";
import Seo from "@/components/common/Seo";
import OrderItems from "@/components/order/OrderItems";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import OrderStatusTracker from "@/components/order/OrderStatusTracker";
import { PAYMENT_METHODS } from "@/constants/order";
import { getSessionEmail, isAdminRequest } from "@/server/guards";
import { getOrderById } from "@/server/queries";
import { formatDateTime, formatPrice, shortId } from "@/utils/format";

const Detail = ({ label, children }) => (
  <div>
    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
    <dd className="mt-1 break-words font-medium text-secondary">{children}</dd>
  </div>
);

const OrderPage = ({ order }) => (
  <div className="container max-w-3xl py-10 sm:py-14">
    <Seo title={`Order ${shortId(order._id)}`} noindex />
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="eyebrow">Order tracking</p>
        <h1 className="page-title mt-2">Order {shortId(order._id)}</h1>
      </div>
      <OrderStatusBadge status={order.status} />
    </div>
    <div className="card mt-8 px-2 py-8 sm:px-6">
      <OrderStatusTracker status={order.status} />
    </div>
    {order.items?.length > 0 && (
      <section className="card mt-6 p-6" aria-labelledby="order-items">
        <h2 id="order-items" className="font-semibold text-secondary">
          Items
        </h2>
        <OrderItems items={order.items} className="mt-4" />
      </section>
    )}
    <dl className="card mt-6 grid gap-6 p-6 sm:grid-cols-2">
      <Detail label="Customer">{order.customer}</Detail>
      <Detail label="Placed on">{formatDateTime(order.createdAt)}</Detail>
      <Detail label="Delivery address">{order.address}</Detail>
      <Detail label="Payment">{PAYMENT_METHODS[order.method]}</Detail>
      <Detail label="Total">{formatPrice(order.total)}</Detail>
    </dl>
    <Link href="/menu" className="btn btn-outline mt-8">
      Back to the menu
    </Link>
  </div>
);

export const getServerSideProps = async ({ req, res, params }) => {
  const order = await getOrderById(params.id);

  if (!order) {
    return { notFound: true };
  }

  if (!isAdminRequest(req)) {
    const email = await getSessionEmail(req, res);

    if (!email) {
      return { redirect: { destination: "/auth/login", permanent: false } };
    }
    if (email !== order.email) {
      return { notFound: true };
    }
  }

  return { props: { order } };
};

export default OrderPage;
