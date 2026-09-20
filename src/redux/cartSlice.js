import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products.splice(action.payload, 1);
    },
    resetCart: () => initialState,
  },
});

export const selectCartProducts = (state) => state.cart.products;

export const selectCartCount = (state) => state.cart.products.length;

export const selectCartTotal = (state) =>
  state.cart.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

export const { addProduct, removeProduct, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
