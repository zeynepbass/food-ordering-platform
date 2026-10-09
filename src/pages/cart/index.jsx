import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import Seo from "@/components/common/Seo";
import { CASH_ON_DELIVERY } from "@/constants/order";
import useCurrentUser from "@/hooks/useCurrentUser";
import { resetCart, selectCartProducts, selectCartTotal } from "@/redux/cartSlice";
import orderService from "@/services/orderService";
import { formatPrice } from "@/utils/format";

const toOrderItem = ({ productId, sizeIndex, extras, quantity }) => ({
  productId,
  sizeIndex,
  extraIds: extras.map((extra) => extra._id),
  quantity,
});

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector(selectCartProducts);
  const total = useSelector(selectCartTotal);
  const { user, status } = useCurrentUser();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const isSignedIn = status === "authenticated";

  const handleCheckout = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to place your order.");
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const order = await orderService.create({
        items: products.map(toOrderItem),
        method: CASH_ON_DELIVERY,
      });
      await router.push(`/order/${order._id}`);
      dispatch(resetCart());
      toast.success("Order placed successfully");
    } catch (err) {
      toast.error(err.message);
      setSubmitting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="container py-10 sm:py-14">
      <Seo title="Cart" noindex />
      <h1 className="page-title">Your cart</h1>
      {products.length === 0 ? (
        <div className="card mt-8">
          <EmptyState
            icon={FiShoppingBag}
            title="Your cart is empty"
            text="Browse the menu and add something tasty."
            action={
              <Link href="/menu" className="btn btn-primary">
                Browse the menu
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <CartItems products={products} />
          <CartSummary
            itemCount={products.length}
            total={total}
            user={user}
            isSignedIn={isSignedIn}
            disabled={status === "loading"}
            onCheckout={handleCheckout}
          />
        </div>
      )}
      {isConfirmOpen && (
        <ConfirmDialog
          title="Place this order?"
          message={`You will pay ${formatPrice(total)} in cash when your order is delivered.`}
          confirmLabel="Place order"
          loading={isSubmitting}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
};

export default CartPage;
