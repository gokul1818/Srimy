import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import logo from "../../assets/Makerl.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../Header/header.css";
import { useState } from "react";
import UseAuth from "../../customhook/useAuth";
import useGetData from "../../customhook/useGetData";
import OffCanvasMenu from "./OffCanvas";
import ManufactureUnit from "../ui/ManufactureUnit";

const Header = () => {
  const navigate = useNavigate();
  const { data: product, loading } = useGetData("products");

  const [products, setProducts] = useState([]);
  const [searchValue, setSearchvalue] = useState("");
  const { currentUser } = UseAuth();
  const location = useLocation();

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

  useEffect(() => {
    setProducts([]); // Clear products when URL changes
  }, [location]);

  return (
    <header className="stickey_header">
      <Row>
        <div className="navbar">
          <NavLink to="/">
            <div className="logo ms-1 ">
              {/* <img src={logo} alt="logo"></img>
               */}
              <p className="mb-0">SRIMY Engineering</p>
            </div>
          </NavLink>

    
          <div className="nav_icon">
            <span className="mobile_menu">
              <OffCanvasMenu />
            </span>
          </div>
        </div>
      </Row>
      <Container>
        <Row>
          {products.length !== 0 && (
            <ManufactureUnit data={products} searchList productLimit={5} />
          )}
        </Row>
      </Container>
    </header>
  );
};

export default Header;
