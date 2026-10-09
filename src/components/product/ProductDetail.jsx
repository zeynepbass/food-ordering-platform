import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FiCheck, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import SizeSelector from "@/components/product/SizeSelector";
import useProductOptions from "@/hooks/useProductOptions";
import { addProduct, selectCartProducts } from "@/redux/cartSlice";
import { formatPrice } from "@/utils/format";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);
  const { sizeIndex, setSizeIndex, extras, price, toggleExtra, cartItem } =
    useProductOptions(product);

  const isInCart = cartProducts.some((item) => item.productId === product._id);

  const handleAddToCart = () => {
    dispatch(addProduct(cartItem));
    toast.success("Added to cart");
  };

  return (
    <div className="container grid items-center gap-10 py-10 md:grid-cols-2 md:py-16 lg:gap-16">
      <div className="relative aspect-square w-full rounded-3xl bg-primary-50">
        <Image
          src={product.img}
          alt={product.title}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-10 sm:p-16"
        />
      </div>
      <div>
        <span className="badge badge-neutral capitalize">{product.category}</span>
        <h1 className="page-title mt-3">{product.title}</h1>
        <p className="mt-3 text-2xl font-semibold text-secondary" aria-live="polite">
          {formatPrice(price)}
        </p>
        <p className="mt-4 text-muted">{product.desc}</p>
        {product.prices.length > 1 && (
          <div className="mt-8">
            <SizeSelector
              prices={product.prices}
              selectedIndex={sizeIndex}
              onSelect={setSizeIndex}
            />
          </div>
        )}
        {product.extraOptions.length > 0 && (
          <fieldset className="mt-8">
            <legend className="field-label">Add extras</legend>
            <div className="flex flex-wrap gap-2">
              {product.extraOptions.map((extra) => (
                <label
                  key={extra._id}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm transition-colors hover:border-primary/60 has-[:checked]:border-primary has-[:checked]:bg-primary-50"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={extras.some((item) => item._id === extra._id)}
                    onChange={(event) => toggleExtra(extra, event.target.checked)}
                  />
                  <span className="font-medium text-secondary">{extra.text}</span>
                  <span className="text-xs text-muted">+{formatPrice(extra.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="btn btn-lg btn-primary"
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? (
              <>
                <FiCheck aria-hidden="true" /> In your cart
              </>
            ) : (
              <>
                <FiShoppingBag aria-hidden="true" /> Add to cart
              </>
            )}
          </button>
          {isInCart && (
            <Link href="/cart" className="btn btn-lg btn-outline">
              View cart
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
