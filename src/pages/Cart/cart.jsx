import React, { useEffect, useState } from "react";
import "../../styles/cart.css";
import Helmet from "../../components/helmet/helmet";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../../components/ui/Commonsection";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { motion } from "framer-motion";
import UseAuth from "../../customhook/useAuth";
import { cart_Action } from "../../redux/slicer/cart_slice";
import Checkout from "../Checkout/checkout";
import Button from "../../components/common/Button/button";
const Cart = () => {
  const { currentUser } = UseAuth();
  const cart_items = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [totalamt, setTotalamt] = useState();
  const [shippingfee, setshippingfee] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [checkout, setCheckout] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleCheckout = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setCheckout(true);
      window.scrollTo(0, 250);
    }, 1000);
  };
  


  useEffect(() => {
    if (totalAmount > 1000) {
      setshippingfee(0);
    } else {
      setshippingfee(49);
    }
  }, [setshippingfee]);

  return (
    <Helmet title={checkout ? "cart/Checkout" : "cart"}>
      {!checkout ? <CommonSection title="shopping cart" /> : ""}
      <section style={{ marginTop: "70px" }}>
        <Container>
          <Row>
            <Col ld="9">
              {cart_items == 0 ? (
                <>
                  <h4 className="text-center fs-4">no product found</h4>
                  <div className="contbtn">
                    <NavLink
                      style={{
                        textDecorationLine: "none",
                      }}
                      to="/Shop"
                    >
                      <button className="">continue shopping </button>
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  <table className="table bordered">
                    <thead className="">
                      <tr>
                        <th>image</th>
                        <th>Title</th> <th>price</th> <th>quantity</th>{" "}
                        <th>delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart_items.map((item, index) => (
                        <Tr key={index} item={item} />
                      ))}
                    </tbody>
                  </table>
                  <div className="contbtn">
                    <NavLink
                      style={{
                        textDecorationLine: "none",
                      }}
                      to="/Shop"
                    >
                      <button className="">continue shopping </button>
                    </NavLink>
                  </div>
                </>
              )}
            </Col>
            {cart_items.length >= 1 && (
              <Col lg="3">
                <div>
                  <h3>Subtotal</h3>
                  <div className="total_amount">
                    <span>
                      {/* </span> */}
                      ItemAmount :
                    </span>{" "}
                    <span>₹ {totalAmount}</span>
                  </div>
                  <div className="total_amount ">
                    <span>Shipping fee :</span>{" "}
                    <span>
                      {" "}
                      {totalAmount > 1000 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        <span>₹{shippingfee}</span>
                      )}
                    </span>
                  </div>
                  {totalAmount < 1000 && (
                    <p>(order above ₹1000 get free shipping)</p>
                  )}
                  <hr className="mt-4" />
                  <div className="total_amount ">
                    <span>
                      {/* </span> */}
                      TotalAmount :
                    </span>{" "}
                    <span>₹ {totalAmount + shippingfee}</span>
                  </div>
                </div>
                <div className="contbtn">
                  {currentUser ? (
                    <Button
                      text="Submit"
                      onClick={handleCheckout}
                      loading={showLoader}
                      disabled={showLoader}
                    />
                  ) : (
                    <NavLink
                      style={{
                        textDecorationLine: "none",
                      }}
                      to="/login"
                    >
                      <button className="">Login/SignUp</button>
                    </NavLink>
                  )}
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      {checkout ? (
        <>
          <hr></hr>
          <Checkout />
        </>
      ) : (
        ""
      )}
    </Helmet>
  );
};
const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const productdelete = () => {
    dispatch(cart_Action.deleteItems(item.id));
  };

  console.log(item.image);
  return (
    <tr>
      <td className="table_img">
        <img src={item.image} alt="img"></img>
      </td>
      <td>{item.productName}</td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <motion.td onClick={productdelete} whileTap={{ scale: 1.1 }}>
        <i class="ri-delete-bin-6-line"></i>
      </motion.td>
    </tr>
  );
};
export default Cart;
