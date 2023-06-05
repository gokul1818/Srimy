import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  WishlistItems: [],
  // totalAmount: 0,
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

// export const { addItems, deleteItems } = WishlistSlice.actions;

// export default WishlistSlice.reducer;
export const Wishlist = WishlistSlice.actions;
export default WishlistSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: {
//     totalQuantity: 0,
//     WishlistItems: [],
//   },
//   reducers: {
//     addToWishlist: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.WishlistItems.find(
//         (wishlistItem) => wishlistItem.id === item.id
//       );

//       if (!existingItem) {
//         state.WishlistItems.push({ id: item.id });
//       }

//       state.totalQuantity = state.WishlistItems.length;
//     },
//     removeFromWishlist: (state, action) => {
//       const itemId = action.payload;
//       const index = state.WishlistItems.findIndex(
//         (wishlistItem) => wishlistItem.id === itemId.id
//       );

//       if (index !== -1) {
//         state.WishlistItems.splice(index, 1);
//       }

//       state.totalQuantity = state.WishlistItems.length;
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;
