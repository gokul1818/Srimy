import React, { useState, useRef, useEffect } from "react";
import "../../styles/productdetails.css";
import Helmet from "../../components/helmet/helmet";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../../components/ui/Commonsection";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductList from "../../components/ui/ProductList";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useGetData from "../../customhook/useGetData";
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { cart_Action } from "../../redux/slicer/cart_slice";
import { DotLoader } from "react-spinners";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState();
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const { data: products } = useGetData("products");

  const docRef = doc(db, "products", id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No product found");
      }
    };
    getProduct();
  }, [product]);

  const { imgUrl, category, productName, price, description, shortDesc } =
    product;

  const relatedProducts = products.filter((item) => item.category === category);
  const reviewUser = useRef("");
  const reviewMsg = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewUsername = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUsername,
      text: reviewUserMsg,
      rating,
    };
    console.log(reviewObj);
  };

  const addToCart = () => {
    dispatch(
      cart_Action.addItems({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Added to cart");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="head">
      <Helmet>
        {loading ? (
          <DotLoader></DotLoader>
        ) : (
          <>
            <section>
              <Container>
                <Row>
                  <Col lg="6">
                    <div className="product_img mt-4">
                      <img src={imgUrl} alt="img" />
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="product_details ">
                      <h3>{productName}</h3>
                      <div className="product_rating">
                        <div className="star">
                          <span>
                            <i className="ri-star-s-fill"></i>
                          </span>
                          <span>
                            <i className="ri-star-s-fill"></i>
                          </span>
                          <span>
                            <i className="ri-star-s-fill"></i>
                          </span>
                          <span>
                            <i className="ri-star-s-fill"></i>
                          </span>
                          <span>
                            <i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                      </div>
                      <span className="price">{`₹${price}`}</span>
                      <p>{shortDesc}</p>
                      <motion.button
                        onClick={addToCart}
                        whileTap={{ scale: 1.2 }}
                        className="shop_btn"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section>
              <Container>
                <Row>
                  <Col lg="12">
                    <div className="tab_wrapper d-flex align-items-center mt-5 gap-5 ">
                      <h6
                        className={`${tab === "desc" ? "active" : ""}`}
                        onClick={() => setTab("desc")}
                      >
                        Description
                      </h6>
                      <h6
                        className={`${tab === "rev" ? "active" : ""}`}
                        onClick={() => setTab("rev")}
                      >
                        Review
                      </h6>
                    </div>

                    {tab === "desc" ? (
                      <div className="tab_content">
                        <p>{description}</p>
                      </div>
                    ) : (
                      <div className="product_review">
                        <div className="review_wrapper">
                          <div className="review_form mx-5">
                            <form onSubmit={handleSubmit}>
                              <h4 className="d-block">Leave your comments</h4>
                              <div className="form_grp">
                                <input
                                  ref={reviewUser}
                                  type="text"
                                  required
                                  placeholder="Enter name"
                                />
                              </div>
                              <div className="form_grp d-flex align-items-center gap-1">
                                <motion.span
                                  whileTap={{ scale: 1.2 }}
                                  onClick={() => setRating(1)}
                                >
                                  1 <i className="ri-star-s-fill"></i>
                                </motion.span>
                                <motion.span
                                  whileTap={{ scale: 1.2 }}
                                  onClick={() => setRating(2)}
                                >
                                  2<i className="ri-star-s-fill"></i>
                                </motion.span>
                                <motion.span
                                  whileTap={{ scale: 1.2 }}
                                  onClick={() => setRating(3)}
                                >
                                  3<i className="ri-star-s-fill"></i>
                                </motion.span>
                                <motion.span
                                  whileTap={{ scale: 1.2 }}
                                  onClick={() => setRating(4)}
                                >
                                  4<i className="ri-star-s-fill"></i>
                                </motion.span>
                                <motion.span
                                  whileTap={{ scale: 1.2 }}
                                  onClick={() => setRating(5)}
                                >
                                  5<i className="ri-star-s-fill"></i>
                                </motion.span>
                              </div>
                              <div className="form_grp">
                                <textarea
                                  placeholder="Review"
                                  rows={5}
                                  ref={reviewMsg}
                                  required
                                ></textarea>
                              </div>
                              <motion.button
                                whileTap={{ scale: 1.2 }}
                                className="submit"
                                type="submit"
                              >
                                Submit
                              </motion.button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col lg="12">
                    <h4 className="related_products">You might also like</h4>
                  </Col>
                  <ProductList data={relatedProducts} />
                </Row>
              </Container>
            </section>
          </>
        )}
      </Helmet>
    </section>
  );
};

export default ProductDetails;
