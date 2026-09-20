import Link from "next/link";
import Title from "@/components/common/Title";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import { ORDER_STATUS } from "@/constants/order";
import useFetch from "@/hooks/useFetch";
import orderService from "@/services/orderService";

const UserOrders = () => {
  const { data: orders, loading } = useFetch(orderService.getAll, []);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="overflow-x-auto w-full mt-5">
        {!loading && orders.length === 0 ? (
          <p className="font-semibold">You have not placed any orders yet.</p>
        ) : (
          <DataTable headers={["ID", "ADDRESS", "DATE", "TOTAL", "STATUS"]}>
            {orders.map((order) => (
              <DataRow key={order._id}>
                <DataCell>
                  <Link href={`/order/${order._id}`} className="underline">
                    {order._id.substring(0, 6)}...
                  </Link>
                </DataCell>
                <DataCell>{order.address}</DataCell>
                <DataCell>{new Date(order.createdAt).toLocaleDateString()}</DataCell>
                <DataCell>${order.total}</DataCell>
                <DataCell>{ORDER_STATUS[order.status]}</DataCell>
              </DataRow>
            ))}
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
