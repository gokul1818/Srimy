import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import UseAuth from "../../customhook/useAuth";
import "./OffCanvas.css";
import { useSelector } from "react-redux";

const OffCanvasMenu = () => {
  const { currentUser } = UseAuth();

  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalfav = useSelector((state) => state.wishlist.totalQuantity);

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };
  const handlelogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("log out successfully");
        navigate("/home");
        setIsOpen(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Menu isOpen={isOpen} onStateChange={({ isOpen }) => setIsOpen(isOpen)}>
      <NavLink to="/" onClick={closeMenu}>
        Home
      </NavLink>
      <NavLink to="/shop" onClick={closeMenu}>
        Shop
      </NavLink>
      {currentUser && (
        <NavLink to="/orders" onClick={closeMenu}>
          My Orders
        </NavLink>
      )}
      {currentUser && (
        <NavLink to="/profile" onClick={closeMenu}>
          My Profile
        </NavLink>
      )}
      {
        <NavLink to="/wishlist" onClick={closeMenu}>
          Wishlist
          <i class="ri-heart-3-line ml-2"></i>
          <span className="off_bandage1">({totalfav})</span>
        </NavLink>
      }
      {
        <NavLink to="/cart" onClick={closeMenu}>
          My Cart
          <i class="ri-shopping-cart-fill ml-2 "></i>
          <span className="off_bandage2">({totalQuantity})</span>
        </NavLink>
      }
      {currentUser && (
        <NavLink to="/" onClick={handlelogout}>
          Logout
        </NavLink>
      )}
      {!currentUser && (
        <NavLink to="/login" onClick={closeMenu}>
          Login/signup
        </NavLink>
      )}
    </Menu>
  );
};

export default OffCanvasMenu;
