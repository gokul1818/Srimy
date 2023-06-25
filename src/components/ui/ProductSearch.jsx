import React from "react";
import { Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/ProductSearchList.css";

const ProductSearch = ({ item, loading }) => {
  const navigate = useNavigate();

  const navigateToProduct = () => {
    navigate(`/shop/${item.id}`);
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.value = "";
    }
  };

  return (
    <Col lg="3" md="4" sm="6" xs="6" className="">
      <motion.div
        className="products_Search_items"
        onClick={navigateToProduct}
        style={{ cursor: "pointer" }}
      >
        <div className="products_Search_img">
          <img src={item.imgUrl} alt="img" />
        </div>
        <div className="product_Search_info">
          <h4>{item.productName}</h4>
          <span>₹{item.price}</span>
        </div>
      </motion.div>
    </Col>
  );
};

export default ProductSearch;
