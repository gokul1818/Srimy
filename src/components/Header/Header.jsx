import React, { useEffect, useRef } from "react";
import { Container, Row } from "reactstrap";
import logo from "../../assets/Makerly.png";
import logo1 from "../../assets/logo.png";
import userIcon from "../../assets/profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Header/header.css";
import { Link } from "react-router-dom";
import UseAuth from "../../customhook/useAuth";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
const Header = () => {
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
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

  const menuRef = useRef(null);
  const menu_toggle = () => menuRef.current.classList.toggle("active_menu");
  const navigateToCart = () => {
    navigate("/cart");
  };

  const profiletoggle = () => {
    navigate("/profile");
  };
  const toggleProfile = () =>
    showProfileActionRef.current.classList.toggle("show_profile_action");
  return (
    <header
      className="stickey_header"
      // ref={menuRef}
    >
      <Container>
        <Row>
          <div className="navbar">
            <NavLink to="Home">
              <div className="logo ms-2 ">
                {/* <img className="logo_img" src={logo1} alt="logo"></img> */}
                <div>
                  <h2>
                    {" "}
                    <img src={logo} alt="logo"></img>
                  </h2>
                </div>
              </div>
            </NavLink>

            <div
              className="navigation pt-3 "
              ref={menuRef}
              onClick={menu_toggle}
            >
              <ul className="menu">
                {Navlink.map((items) => (
                  <li className="list">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active" : "inactive"
                      }
                      style={{
                        textDecorationLine: "none",
                        color: "white",
                        marginRight: "20px",
                      }}
                      to={items.path}
                    >
                      {items.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_icon">
              <span className="cart_icon me-4" onClick={navigateToCart}>
                <span className="bandage">{totalQuantity}</span>
                <i class="ri-shopping-cart-fill "></i>
              </span>
              <span className="fav_icon me-4">
                <span className="bandage">1</span>

                <i class="ri-heart-3-line"></i>
              </span>
              <div className="profile">
                <img
                  onClick={profiletoggle}
                  // ref={showProfileActionRef}
                  // onClick={toggleProfile}
                  src={ userIcon}
                  alt={ "img"}
                ></img>
                {/* <div
                  className="profile_action"
                  ref={showProfileActionRef}
                  // onClick={toggleProfile}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex">
                      <Link
                        to="/Signup"
                        style={{
                          textDecorationLine: "none",
                          color: "black",
                        }}
                      >
                        Signup{" "}
                      </Link>
                      /
                      <Link
                        to="/Login"
                        style={{
                          textDecorationLine: "none",
                          color: "black",
                        }}
                      >
                        Login{" "}
                      </Link>
                    </div>
                  )}
                </div> */}
              </div>
              <span
                // ref={menuRef}
                onClick={menu_toggle}
                className="mobile_menu mx-3"
              >
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};
export default Header;
