import React, { useEffect, useState } from "react";
import "../../styles/cart.css";
import Helmet from "../../components/helmet/helmet";
import { Container, Row, Col } from "reactstrap";
// import CommonSection from "../../components/ui/Commonsection";
// import td_img from "../../assets/images/arm-chair-03.jpg";
// import { motion } from "framer-motion";
// import { NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { motion } from "framer-motion";
// import { cart_Action } from "../../redux/slicer/cart_slice";
// import Wishlist_action from "../../redux/slicer/wishlist";
// import ProductList from "../../components/ui/ProductList";
import ProductCard from "../../components/ui/ProductCard";
const Wishlist = () => {
  const wishlist_item = useSelector((state) => state.wishlist.WishlistItems);
  console.log('first', wishlist_item)
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [shippingfee, setshippingfee] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (totalAmount > 1000) {
      setshippingfee(0);
    } else {
      setshippingfee(49);
    }
  }, [setshippingfee]);

  // console.log(result, "dd");
  return (
    <Helmet  title="cart">
      {/* <CommonSection title="shopping cart" /> */}
      <section>
        <Container className="mt-5">
          <Row>
            {wishlist_item.map((item,index)=>(

          <ProductCard item={item} key={index}/>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Wishlist;
