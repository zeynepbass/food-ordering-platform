import { useCallback, useMemo, useState } from "react";

const useProductOptions = (product) => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [extras, setExtras] = useState([]);

  const price = useMemo(() => {
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
    return product.prices[sizeIndex] + extrasTotal;
  }, [product.prices, sizeIndex, extras]);

  const toggleExtra = useCallback((extra, checked) => {
    setExtras((current) =>
      checked
        ? [...current, extra]
        : current.filter((item) => item._id !== extra._id)
    );
  }, []);

  const cartItem = useMemo(
    () => ({
      productId: product._id,
      title: product.title,
      img: product.img,
      price,
      extras,
      quantity: 1,
    }),
    [product, price, extras]
  );

  return { sizeIndex, setSizeIndex, price, toggleExtra, cartItem };
};

export default useProductOptions;
