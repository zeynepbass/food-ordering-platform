import Seo from "@/components/common/Seo";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import OrderStatusTracker from "@/components/order/OrderStatusTracker";
import { getOrderById } from "@/server/queries";

const OrderPage = ({ order }) => (
  <div className="overflow-x-auto">
    <Seo title="Order" />
    <div className="min-h-[calc(100vh_-_433px)] flex justify-center items-center flex-col p-10 min-w-[1000px]">
      <div className="flex items-center flex-1 w-full max-h-28">
        <DataTable headers={["ORDER ID", "CUSTOMER", "ADDRESS", "TOTAL"]}>
          <DataRow>
            <DataCell>{order._id.substring(0, 5)}...</DataCell>
            <DataCell>{order.customer}</DataCell>
            <DataCell>{order.address}</DataCell>
            <DataCell>${order.total}</DataCell>
          </DataRow>
        </DataTable>
      </div>
      <OrderStatusTracker status={order.status} />
    </div>
  </div>
);

export const getServerSideProps = async ({ params }) => {
  const order = await getOrderById(params.id);

  if (!order) {
    return { notFound: true };
  }
  return { props: { order } };
};

export default OrderPage;
