import React from "react";

import Cart from "../pages/Cart/cart";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/login";
import Productdetails from "../pages/ProductDetails/productdetails";
import Shop from "../pages/Shop/shop";
import Signup from "../pages/Signup/singup";
import Checkout from "../pages/Checkout/checkout";
import ProtectedRoute from "./protectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
// import Profile from "../pages/Profile/profile";
import Profile from "../pages/Profile/profile";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" n/>}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="Signup" element={<Signup />}></Route>
        <Route path="shop/:id" element={<Productdetails />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        ></Route>

    
        <Route
          path="profile"
          element={
            // <ProtectedRoute>
            // </ProtectedRoute>
            <Profile />
          }
        ></Route>
      </Routes>
    </>
  );
};
export default Routers;
