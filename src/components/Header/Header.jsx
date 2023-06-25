import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import logo from "../../assets/Makerl.svg";
import logo1 from "../../assets/logo.png";
import userIcon from "../../assets/profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Header/header.css";
import { useState } from "react";
import UseAuth from "../../customhook/useAuth";
import useGetData from "../../customhook/useGetData";
import OffCanvasMenu from "./OffCanvas";
import ProductList from "../ui/ProductList";

const Header = () => {
  const navigate = useNavigate();
  const { data: product, loading } = useGetData("products");

  const [products, setProducts] = useState([]);
  const [searchValue, setSearchvalue] = useState("");
  const { currentUser } = UseAuth();
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

  const handleSearch = () => {
    // e.preventDefault();
    if (searchValue.trim() !== "") {
      const searchProducts = product.filter((item) =>
        item.productName
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      );
      setProducts(searchProducts);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  return (
    <header className="stickey_header">
      <Row>
        <div className="navbar">
          <NavLink to="/">
            <div className="logo ms-1 ">
              <img src={logo} alt="logo"></img>
            </div>
          </NavLink>

          <div className="search_box">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e)=>setSearchvalue(e.target.value)}
              id="searchInput"
            />
            <span>
              <i className="ri-search-2-line"></i>
            </span>
          </div>
          <div className="nav_icon">
            <span className="mobile_menu">
              <OffCanvasMenu />
            </span>
          </div>
        </div>
      </Row>
      <Container>
        <Row>
          {products.length !== 0 && 
          <ProductList data={products} searchList productLimit={5} />}
        </Row>
      </Container>
    </header>
  );
};

export default Header;
