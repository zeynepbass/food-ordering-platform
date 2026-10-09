import Image from "next/image";
import { useDispatch } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { removeProduct } from "@/redux/cartSlice";
import { formatPrice } from "@/utils/format";

const describeOptions = (product) =>
  [product.size, ...product.extras.map((extra) => extra.text)].filter(Boolean).join(" · ");

const CartItems = ({ products }) => {
  const dispatch = useDispatch();

  return (
    <ul className="card divide-y divide-line">
      {products.map((product, index) => (
        <li key={`${product.productId}-${index}`} className="flex items-center gap-4 p-4 sm:p-5">
          <div className="relative h-16 w-16 shrink-0 rounded-xl bg-primary-50 sm:h-20 sm:w-20">
            <Image src={product.img} alt="" fill sizes="80px" className="object-contain p-2" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-secondary">{product.title}</p>
            <p className="mt-0.5 text-sm text-muted">
              {describeOptions(product) || "No extras"}
            </p>
            <p className="mt-0.5 text-sm text-muted">Qty {product.quantity}</p>
          </div>
          <p className="font-semibold text-secondary">
            {formatPrice(product.price * product.quantity)}
          </p>
          <button
            type="button"
            aria-label={`Remove ${product.title} from cart`}
            className="grid h-9 w-9 shrink-0 place-content-center rounded-full text-muted transition-colors hover:bg-red-50 hover:text-danger"
            onClick={() => dispatch(removeProduct(index))}
          >
            <FiTrash2 size={17} aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
