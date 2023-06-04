import { combineReducers } from "@reduxjs/toolkit";
import cartslice from "./slicer/cart_slice";

const rootReducer = combineReducers({
  cart: cartslice,

  // Add more reducers here as needed
});

export default rootReducer;
