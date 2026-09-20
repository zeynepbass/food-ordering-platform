import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Title from "@/components/common/Title";
import SizeSelector from "@/components/product/SizeSelector";
import useProductOptions from "@/hooks/useProductOptions";
import { addProduct, selectCartProducts } from "@/redux/cartSlice";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);
  const { sizeIndex, setSizeIndex, price, toggleExtra, cartItem } =
    useProductOptions(product);

  const isInCart = cartProducts.some((item) => item.productId === product._id);

  const handleAddToCart = () => {
    dispatch(addProduct(cartItem));
    toast.success("Added to cart", { autoClose: 1000 });
  };

  return (
    <div className="container mx-auto flex items-center md:min-h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap">
      <div className="relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto min-h-[300px]">
        <Image src={product.img} alt={product.title} fill priority className="object-contain" />
      </div>
      <div className="md:flex-1 md:text-start text-center">
        <Title addClass="text-6xl">{product.title}</Title>
        <span className="text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block">
          ${price}
        </span>
        <p className="text-sm my-4 md:pr-24">{product.desc}</p>
        {product.prices.length > 1 && (
          <SizeSelector
            sizeCount={product.prices.length}
            selectedIndex={sizeIndex}
            onSelect={setSizeIndex}
          />
        )}
        <div className="flex gap-x-4 my-6 md:justify-start justify-center flex-wrap">
          {product.extraOptions.map((extra) => (
            <label key={extra._id} className="flex items-center gap-x-1">
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                onChange={(event) => toggleExtra(extra, event.target.checked)}
              />
              <span className="text-sm font-semibold">{extra.text}</span>
            </label>
          ))}
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
