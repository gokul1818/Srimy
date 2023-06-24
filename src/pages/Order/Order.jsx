import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase.config";
import { Container, Row, Col, Button, Progress } from "reactstrap";
import "../../styles/order.css";
import OrderModal from "./OrderModal";
// import styles from './Dropdown.module.css';

const Order = () => {
  const [orderdata, setOrderdata] = useState([]);
  const [cart, setCart] = useState([]);
  const [userID, setUserId] = useState(null);
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  console.log("cart", orderdata);

  const fetchOrdersByUserId = async (userID) => {
    try {
      setLoading(true);
      const ordersRef = collection(db, "Orders");
      const q = query(ordersRef, where("UserId", "==", userID));
      const querySnapshot = await getDocs(q);

      const orders = [];
      const cartItems = [];
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        orders.push(order);
        cartItems.push(order.cart);
      });

      setOrderdata(orders);
      setCart(cartItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = getAuth().currentUser;
    window.scroll(0, 0);
    if (user) {
      const userId = user.uid;
      const userName = user.displayName;
      setUserId(userId);
      setUserName(userName);
      fetchOrdersByUserId(userId);
    }
  }, []);

  return (
    <section className="order_detail_outlet">
      <Container>
        {loading ? (
          <div className="Swipper_card">
            <div className="shine"></div>
          </div>
        ) : orderdata.length > 0 ? (
          <div className="order_details">
            <h4 className="my-4">
              Thanks For Your Order, <span>{userName}</span>
            </h4>
            <hr></hr>
            <h5>Receipt</h5>
            <Row>
              {orderdata.map((order, index) => (
                //  const date =new Date(order.Date)
                <div className="order_card" key={index}>
                  <Col lg="12">
                    {cart[index].map((item, i) => (
                      <div className="order_card_data" key={i}>
                        <Col lg="2">
                          <img src={item.image}></img>
                        </Col>
                        <Col className="ms-3" xs="10" md="10" lg="10">
                          <Row className="p-0">
                            <p className="order_date_details p-0">{`Order ${
                              order.Delivery == true ? "Delivery" : "placed"
                            } on ${order.Date.toDate().toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}`}</p>
                          </Row>{" "}
                          <Row className="m-0 p-0">
                            <Col
                              className="order_Product_name d-flex justify-content-between"
                              lg="12"
                            >
                              <div>{item.productName}</div>

                              <div className="pay_btn">
                                {order.paid == false && (
                                  <Button color="danger">Unpaid</Button>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </div>
                    ))}

                    {order.Delivery == true ? (
                      <>
                        {/* <hr className="mx-5 p-0 my-2 " /> */}
                        <div className="Progress_bar">
                          <h6 className="d-flex align-items-end">
                            Track Order
                          </h6>
                          <Col xs="9">
                            <Progress animated color="success" value={100}>
                              Delivered
                            </Progress>
                          </Col>
                        </div>
                      </>
                    ) : (
                      order.paid == true && (
                        <div>
                          {/* <hr className="mx-5 p-0 my-0" /> */}
                          <div className="Progress_bar ">
                            <h6 className="d-flex align-items-end">
                              Track Order
                            </h6>
                            <Col xs="9">
                              <Progress multi>
                                {order.paid == true ? (
                                  <Progress
                                    bar
                                    color="info"
                                    animated
                                    value="50"
                                  >
                                    preparing
                                  </Progress>
                                ) : (
                                  ""
                                )}

                                {order.outForDelivery == true ? (
                                  <Progress bar color="primary" value="40">
                                    {" "}
                                    out for delivery
                                  </Progress>
                                ) : (
                                  ""
                                )}
                              </Progress>
                            </Col>
                          </div>
                        </div>
                      )
                    )}
                  </Col>
                </div>
              ))}
            </Row>

            {/* <OrderModal /> */}
          </div>
        ) : (
          <div className="order_height">No orders found.</div>
        )}
      </Container>
    </section>
  );
};

export default Order;
