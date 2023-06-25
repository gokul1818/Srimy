import { combineReducers } from "@reduxjs/toolkit";
import cartslice from "./slicer/cart_slice";
import wishlist from "./slicer/wishlist";
const rootReducer = combineReducers({
  cart: cartslice,
  wishlist: wishlist,
  
    // Add more reducers here as needed
});

export default rootReducer;
