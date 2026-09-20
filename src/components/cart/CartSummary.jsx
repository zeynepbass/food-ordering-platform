import Title from "@/components/common/Title";

const CartSummary = ({ total, disabled, onCheckout }) => (
  <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start text-center">
    <Title addClass="text-[40px]">CART TOTAL</Title>
    <div className="mt-6">
      <b>Subtotal: </b>${total} <br />
      <b className="inline-block my-1">Discount: </b>$0.00 <br />
      <b>Total: </b>${total}
    </div>
    <div>
      <button
        type="button"
        className="btn-primary mt-4 md:w-auto w-52"
        onClick={onCheckout}
        disabled={disabled}
      >
        CHECKOUT NOW!
      </button>
    </div>
  </div>
);

export default CartSummary;
