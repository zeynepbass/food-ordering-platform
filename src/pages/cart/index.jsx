import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Seo from "@/components/common/Seo";
import CartSummary from "@/components/cart/CartSummary";
import CartTable from "@/components/cart/CartTable";
import useCurrentUser from "@/hooks/useCurrentUser";
import { resetCart, selectCartProducts, selectCartTotal } from "@/redux/cartSlice";
import orderService from "@/services/orderService";

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector(selectCartProducts);
  const total = useSelector(selectCartTotal);
  const { user, session } = useCurrentUser();

  const handleCheckout = async () => {
    if (!session) {
      toast.error("Please login first.", { autoClose: 1000 });
      return;
    }
    if (!confirm("Are you sure to order?")) return;

    try {
      const order = await orderService.create({
        address: user?.address || "No address",
        total,
        method: 0,
      });
      dispatch(resetCart());
      toast.success("Order created successfully", { autoClose: 1000 });
      router.push(`/order/${order._id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <Seo title="Cart" />
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
          <div className="max-h-52 overflow-auto w-full">
            <CartTable products={products} />
          </div>
        </div>
        <CartSummary
          total={total}
          disabled={products.length === 0}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default CartPage;
