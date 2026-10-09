import { useState } from "react";
import { SIZES } from "@/constants/product";

const useProductOptions = (product) => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [extras, setExtras] = useState([]);

  const hasSizes = product.prices.length > 1;
  const price =
    product.prices[sizeIndex] + extras.reduce((sum, extra) => sum + extra.price, 0);

  const toggleExtra = (extra, checked) => {
    setExtras((current) =>
      checked ? [...current, extra] : current.filter((item) => item._id !== extra._id)
    );
  };

  const cartItem = {
    productId: product._id,
    title: product.title,
    img: product.img,
    price,
    sizeIndex,
    size: hasSizes ? SIZES[sizeIndex] : null,
    extras,
    quantity: 1,
  };

  return { sizeIndex, setSizeIndex, extras, price, toggleExtra, cartItem };
};

export default useProductOptions;
