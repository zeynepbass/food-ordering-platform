import { restoreCart, selectCartProducts } from "@/redux/cartSlice";

const STORAGE_KEY = "cart";

const isCartItem = (item) =>
  typeof item?.productId === "string" &&
  typeof item.title === "string" &&
  typeof item.price === "number" &&
  Number.isInteger(item.sizeIndex) &&
  Array.isArray(item.extras);

const readCart = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved.filter(isCartItem) : [];
  } catch {
    return [];
  }
};

const writeCart = (products) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // Storage can be unavailable (private mode, quota); the cart then simply lasts for the session.
  }
};

// Restores the cart after hydration, so server and client markup match, then keeps storage in sync.
export const persistCart = (store) => {
  const saved = readCart();
  if (saved.length > 0) {
    store.dispatch(restoreCart(saved));
  }

  let previous = selectCartProducts(store.getState());

  return store.subscribe(() => {
    const current = selectCartProducts(store.getState());
    if (current !== previous) {
      previous = current;
      writeCart(current);
    }
  });
};
