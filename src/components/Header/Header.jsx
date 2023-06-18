import React, { useEffect, useRef } from "react";
import { Container, Row } from "reactstrap";
import logo from "../../assets/Makerl.svg";
import logo1 from "../../assets/logo.png";
import userIcon from "../../assets/profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Header/header.css";
import UseAuth from "../../customhook/useAuth";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import OffCanvasMenu from "./OffCanvas";
const Header = () => {
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalfav = useSelector((state) => state.wishlist.totalQuantity);

  const { currentUser } = UseAuth();
  const showProfileActionRef = useRef(null);
  console.log(currentUser, "ll");
  const Navlink = [
    {
      path: "Home",

      display: "Home",
    },
    {
      path: "Shop",
      display: "Shop",
    },
    {
      path: "Cart",
      display: "Cart",
    },
  ];
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("log out successfully");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navigateToCart = () => {
    navigate("/cart");
  };
  const navigateToWishlist = () => {
    navigate("/wishlist");
  };
  // const profiletoggle = () => {
  //   navigate("/profile");
  // };
  return (
    <header
      className="stickey_header"
      // ref={menuRef}
    >
      <Row>
        <div className="navbar ">
          <NavLink to="Home">
            <div className="logo ms-1 ">
              <img src={logo} alt="logo"></img>
            </div>
          </NavLink>

          <div className="nav_icon">
            <span className="cart_icon me-4" onClick={navigateToCart}>
              <span className="bandage">{totalQuantity}</span>
              <i class="ri-shopping-cart-fill "></i>
            </span>
            <span className="fav_icon me-4" onClick={navigateToWishlist}>
              <span className="bandage">{totalfav}</span>

              <i class="ri-heart-3-line"></i>
            </span>
            {/* <div className="profile">
              <img onClick={profiletoggle} src={userIcon} alt={"img"}></img>
            </div> */}
            <span className="mobile_menu mx-3">
              <OffCanvasMenu />
            </span>
          </div>
        </div>
      </Row>
    </header>
  );
};
export default Header;
