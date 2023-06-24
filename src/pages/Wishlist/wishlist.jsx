import React, { useEffect, useState, useRef, Fragment } from "react";
import "../../styles/cart.css";
import Helmet from "../../components/helmet/helmet";
import { Container, Row, Col } from "reactstrap";
import lottie from "lottie-web";
import { useSelector } from "react-redux";
import "../../styles/wishlist.css";
import { NavLink } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";

const Wishlist = () => {
  const wishlist_item = useSelector((state) => state.wishlist.WishlistItems);
  console.log("first", wishlist_item);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const conti = useRef(null);

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: conti.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/whishlist.json"),
    });

    return () => instance.destroy();
  }, [conti]);

  return (
    <Helmet title="cart">
      {/* <CommonSection title="shopping cart" /> */}
      <section>
        <Container className="wishlist_List">
          <Row>
            {wishlist_item.length > 0 ? (
              wishlist_item.map((item, index) => (
                <ProductCard item={item} key={index} />
              ))
            ) : (
              <Fragment>
                <div ref={conti} className="animationContainer" />
                <div className=" Wishlist_is_Empty">
                  <h2>Your Wishlist is Empty!</h2>
                  <NavLink
                    style={{
                      textDecorationLine: "none",
                    }}
                    to="/Shop"
                  >
                    <button className="Wishlist_btn_primary">shop now</button>
                  </NavLink>
                </div>
              </Fragment>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Wishlist;
