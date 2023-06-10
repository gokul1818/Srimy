import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  shipping: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const newItem = action.payload;
      const existingItems = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      console.log(newItem, "ddd");
      state.totalQuantity++;
      if (!existingItems) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItems.quantity++;
        existingItems.totalPrice =
          Number(existingItems.totalPrice) + Number(newItem.price);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      console.log(state.totalQuantity);
      console.log(state.cartItems);
    },
    deleteItems: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cart_Action = cartSlice.actions;
export default cartSlice.reducer;
