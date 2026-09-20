import { useMemo } from "react";
import { toast } from "react-toastify";
import Title from "@/components/common/Title";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import { ORDER_STATUS, PAYMENT_METHODS } from "@/constants/order";
import useFetch from "@/hooks/useFetch";
import orderService from "@/services/orderService";

const OrderManager = () => {
  const { data: orders, setData } = useFetch(orderService.getAll, []);

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [orders]
  );

  const handleNextStage = async (order) => {
    try {
      const updated = await orderService.updateStatus(order._id, order.status + 1);
      setData((current) => current.map((item) => (item._id === updated._id ? updated : item)));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="overflow-x-auto w-full mt-5">
        <DataTable headers={["ORDER ID", "CUSTOMER", "TOTAL", "PAYMENT", "STATUS", "ACTION"]}>
          {sortedOrders.map((order) => (
            <DataRow key={order._id}>
              <DataCell>{order._id.substring(0, 6)}...</DataCell>
              <DataCell>{order.customer}</DataCell>
              <DataCell>$ {order.total}</DataCell>
              <DataCell>{PAYMENT_METHODS[order.method]}</DataCell>
              <DataCell>{ORDER_STATUS[order.status]}</DataCell>
              <DataCell>
                <button
                  type="button"
                  className="btn-primary !bg-success"
                  onClick={() => handleNextStage(order)}
                  disabled={order.status >= ORDER_STATUS.length - 1}
                >
                  Next Stage
                </button>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default OrderManager;
