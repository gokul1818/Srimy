import React, { useState, useEffect } from "react";
import "../../styles/checkout.css";
import Helmet from "../../components/helmet/helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "../../components/common/Button/button";
import { useNavigate } from "react-router";
import { cart_Action } from "../../redux/slicer/cart_slice";
const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalQt = useSelector((state) => state.cart.totalQuantity);
  const cart_items = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [shippingfee, setshippingfee] = useState();
  useEffect(() => {
    if (totalAmount > 1000) {
      setshippingfee(0);
    } else if (totalAmount == 0) {
      setshippingfee(0);
    } else {
      setshippingfee(49);
    }
  }, [setshippingfee]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const [enterdescription, setEnterDescription] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [Pincode, setPincode] = useState("");
  const [State, setState] = useState("");
  const [loading, setloading] = useState(false);
  const [enterlist, setEnterList] = useState("");

  const placeOrder = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    try {
      const docRef = await collection(db, "Orders");
      await addDoc(docRef, {
        Name: UserName,
        email: Email,
        PhoneNumber: PhoneNumber,
        Address: Address,
        Pincode: Pincode,
        state: State,
        cart: cart_items,
        TotalCost: totalAmount + shippingfee,
      });
      setUserName("");
      setEmail("");
      setEnterDescription("");
      setPhoneNumber("");
      setAddress("");
      setPincode("");
      setEnterList("");
      setState("");
      setloading(false);
      navigate("/home");
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      toast.success("order placed");
      dispatch(cart_Action.clearCart());
    } catch (error) {
      toast.error(error.message);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  };

  return (
    <Helmet title="checkout">
      {/* <CommonSection title="Checkout" /> */}
      <section>
        <Container>
          <Form onSubmit={placeOrder}>
            <Row>
              <Col lg="8">
                <h1>Billing Information</h1>
                <FormGroup className="form_grp">
                  <input
                    required
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    value={UserName}
                    placeholder="Enter your Name"
                  />
                </FormGroup>
                <FormGroup className="form_grp">
                  <input
                    required
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={Email}
                  />
                </FormGroup>
                <FormGroup className="form_grp">
                  <input
                    required
                    type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={PhoneNumber}
                    placeholder="Enter your PhoneNumber"
                  />
                </FormGroup>
                <FormGroup className="form_grp">
                  <input
                    required
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={Address}
                    placeholder="Address"
                  />
                </FormGroup>
                <FormGroup className="form_grp">
                  <input
                    required
                    type="Number"
                    onChange={(e) => setPincode(e.target.value)}
                    value={Pincode}
                    placeholder="Pin Code"
                  />
                </FormGroup>
                <FormGroup className="form_grp">
                  <input
                    required
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={State}
                    placeholder="State"
                  />
                </FormGroup>
              </Col>

              <Col lg="4">
                <div className="checkout_cart">
                  <h6>
                    totalQuantity: <span>{totalQt} (Item)</span>
                  </h6>
                  <h6>
                    Subtotal: <span>₹{totalAmount}</span>
                  </h6>
                  <h6>
                    shipping fee:{" "}
                    <span>
                      {" "}
                      {totalAmount > 1000 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        <span>₹{shippingfee}</span>
                      )}
                    </span>
                  </h6>
                  <hr></hr>
                  <h5>
                    TotalCost: <span>₹ {totalAmount + shippingfee}</span>
                  </h5>
                  <Button
                    className="check_out_btn"
                    text="place on order"
                    type="submit"
                    loading={showLoader}
                    disabled={showLoader}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    </Helmet>
  );
};
export default Checkout;
