import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  WishlistItems: [],
  totalQuantity: 0,
};

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const newItem = action.payload;
      const existingItems = state.WishlistItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItems) {
        state.WishlistItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.image,
          price: newItem.price,
          mrp: newItem.mrp,
          category: newItem.category,
        });
      }
    },
    deleteItems: (state, action) => {
      const id = action.payload;
      const existingItem = state.WishlistItems.find((item) => item.id === id);
      if (existingItem) {
        state.WishlistItems = state.WishlistItems.filter(
          (item) => item.id !== id
        );
        state.totalQuantity--;
      }
    },
  },
});

export const Wishlist = WishlistSlice.actions;
export default WishlistSlice.reducer;
