import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Cart from "../pages/Cart/cart";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/login";
import Productdetails from "../pages/ProductDetails/productdetails";
import Shop from "../pages/Shop/shop";
import Signup from "../pages/Signup/singup";
import Checkout from "../pages/Checkout/checkout";
import ProtectedRoute from "./protectedRoute";
import Profile from "../pages/Profile/profile";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/shop/:id" element={<Productdetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/checkout"
        element={
            <Checkout />
          // <ProtectedRoute>
          // </ProtectedRoute>
        }
      />
      <Route path="/profile" element={
        <Profile />

      } />
    </Routes>
  );
};

export default Routers;
