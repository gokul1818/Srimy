import React from "react";
import "../../styles/limitedoffers.css";
import { Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cart_Action } from "../../redux/slicer/cart_slice";
import { toast } from "react-toastify";
const Limited_card = ({ item }) => {
  const dispatch = useDispatch();
  const addTocart = () => {
    dispatch(
      cart_Action.addItems({
        id: item.id,
        productName: item.productName,
        price: item.originalPrice,
        image: item.imageUrl,
      })
    );
    toast.success("product added successfully");
  };
  const calculateDiscountPercentage = () => {
    const discount = item.originalPrice - item.discountedPrice;
    const discountPercentage = (discount / item.originalPrice) * 100;
    return discountPercentage.toFixed(); // Round the discount percentage to 2 decimal places
  };

  return (
    <Col lg="3" md="6" sm="6" xs="6" className="">
      <section className="offer_card">
        <motion.div
          // whileTap={{ scale: 1.1, transition: { duration: 0.3 } }}
          className="products_items d-block"
        >
          <div>
            <div className="discountTag">
              <i class="ri-price-tag-fill">
                <div class="cross-line"></div>
                <p> {calculateDiscountPercentage()} %</p>
              </i>
            </div>
            <div className="discount">
              <span className="">₹{item.originalPrice}</span>
            </div>
            <div className="offer_img">
              <img src={item.imageUrl} alt="img"></img>
            </div>
            <div className="d-block info_limitpage">
              <div className="offer_info">
                <h4>{item.productName}</h4>
              </div>
              <div className="add_cart  ">
                <span>₹{item.discountedPrice}</span>
                <motion.span whileTap={{scale:'1.2'}} onClick={addTocart}>Add to cart</motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </Col>
  );
};

export default Limited_card;
