import Link from "next/link";
import { formatPrice } from "@/utils/format";

const SummaryRow = ({ label, children }) => (
  <div className="flex items-start justify-between gap-4 text-sm">
    <dt className="text-muted">{label}</dt>
    <dd className="text-right font-medium text-secondary">{children}</dd>
  </div>
);

const CartSummary = ({ itemCount, total, user, isSignedIn, disabled, onCheckout }) => (
  <aside className="card p-6 lg:sticky lg:top-24" aria-label="Order summary">
    <h2 className="font-display text-xl font-semibold text-secondary">Order summary</h2>
    <dl className="mt-5 flex flex-col gap-3">
      <SummaryRow label="Items">{itemCount}</SummaryRow>
      <SummaryRow label="Payment">Cash on delivery</SummaryRow>
      {user && (
        <SummaryRow label="Deliver to">
          {user.address || (
            <Link href={`/profile/${user._id}`} className="text-primary-700 underline">
              Add an address
            </Link>
          )}
        </SummaryRow>
      )}
      <div className="mt-2 flex items-center justify-between border-t border-line pt-4">
        <dt className="font-semibold text-secondary">Total</dt>
        <dd className="text-xl font-semibold text-secondary">{formatPrice(total)}</dd>
      </div>
    </dl>
    <button
      type="button"
      className="btn btn-lg btn-primary mt-6 w-full"
      onClick={onCheckout}
      disabled={disabled}
    >
      Checkout
    </button>
    {!isSignedIn && (
      <p className="mt-3 text-center text-xs text-muted">
        <Link href="/auth/login" className="font-semibold text-secondary underline">
          Sign in
        </Link>{" "}
        to place your order.
      </p>
    )}
  </aside>
);

export default CartSummary;
