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
import { useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { cart_Action } from "../../redux/slicer/cart_slice";
import { DotLoader, BarLoader, ScaleLoader } from "react-spinners";
import useAuth from "../../customhook/useAuth";
const ProductDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState();
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const { data: products } = useGetData("products");

  const docRef = doc(db, "products", id);
  const { comments } = product;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please provide a rating");
      return;
    }
    const reviewUsername = currentUser.displayName;

    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUsername,
      text: reviewUserMsg,
      rating,
    };

    const docRef = doc(db, "products", id);

    try {
      setloading(true);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const comments = docSnap.data().comments || [];
        const updatedComments = [...comments, reviewObj];
        await updateDoc(docRef, { comments: updatedComments });
        toast.success("Comment added successfully");
        reviewMsg.current.value = "";
        setRating("");
        setloading(false);
      } else {
        setloading(false);
        console.log("No product found");
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      // toast.error("error");
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setloading(true);
        setProduct(docSnap.data());
        setloading(false);
      } else {
        setloading(false);
        console.log("No product found");
      }
    };
    window.scrollTo(0, 0);
    getProduct();
  }, [products, location]);

  const { imgUrl, category, productName, price, description, shortDesc } =
    product;

  const relatedProducts = products.filter((item) => item.category === category);
  // const reviewUser = useRef("");

  const reviewMsg = useRef("");

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

  return (
    <section className="head">
      <Helmet>
        <>
          <section>
            <Container>
              <Row>
                <Col lg="6">
                  <div className="product_img ">
                    <img src={imgUrl} alt="img" />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="product_details ">
                    <h3>{productName}</h3>
                    <div className="product_rating">
                      <div className="star">
                        <span>
                          <i className="ri-star-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-fill"></i>
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
                  <div className="tab_wrapper d-flex align-items-center mt-3 gap-5 ">
                    <h4
                      className={`${tab === "desc" ? "active mr-4" : "mr-4 "}`}
                      onClick={() => setTab("desc")}
                    >
                      Description
                    </h4>
                    <h4
                      className={`${tab === "rev" ? "active" : ""}`}
                      onClick={() => setTab("rev")}
                    >
                      Review
                    </h4>
                  </div>

                  {tab === "desc" ? (
                    <div className="tab_content">
                      <p>{description}</p>
                    </div>
                  ) : (
                    <div className="product_review">
                      <div className="review_wrapper">
                        <div className="review_form mx-5">
                          <form onSubmit={(e) => handleSubmit(e)}>
                            <h4 className="d-block leave_comments">Leave your comments</h4>
                            {loading ? (
                              <div className="review_loader ">
                                <ScaleLoader></ScaleLoader>{" "}
                              </div>
                            ) : (
                              <>
                                <label style={{ margin: "0px 10px " }}>
                                  Rating
                                </label>
                                <div className="form_grp d-flex ">
                                  <motion.span
                                    whileTap={{ scale: 1.2 }}
                                    onClick={() => setRating(1)}
                                  >
                                    {" "}
                                    {rating >= 1 ? (
                                      <i className="ri-star-fill"></i>
                                    ) : (
                                      <i class="ri-star-line"></i>
                                    )}
                                  </motion.span>
                                  <motion.span
                                    whileTap={{ scale: 1.2 }}
                                    onClick={() => setRating(2)}
                                  >
                                    {" "}
                                    {rating >= 2 ? (
                                      <i className="ri-star-fill"></i>
                                    ) : (
                                      <i class="ri-star-line"></i>
                                    )}
                                  </motion.span>
                                  <motion.span
                                    whileTap={{ scale: 1.2 }}
                                    onClick={() => setRating(3)}
                                  >
                                    {" "}
                                    {rating >= 3 ? (
                                      <i className="ri-star-fill"></i>
                                    ) : (
                                      <i class="ri-star-line"></i>
                                    )}
                                  </motion.span>
                                  <motion.span
                                    whileTap={{ scale: 1.2 }}
                                    onClick={() => setRating(4)}
                                  >
                                    {" "}
                                    {rating >= 4 ? (
                                      <i className="ri-star-fill"></i>
                                    ) : (
                                      <i class="ri-star-line"></i>
                                    )}
                                  </motion.span>
                                  <motion.span
                                    whileTap={{ scale: 1.2 }}
                                    onClick={() => setRating(5)}
                                  >
                                    {" "}
                                    {rating >= 5 ? (
                                      <i className="ri-star-fill"></i>
                                    ) : (
                                      <i class="ri-star-line"></i>
                                    )}
                                  </motion.span>
                                </div>
                                <div className="form_grp">
                                  <textarea
                                    placeholder="Review"
                                    rows={3}
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
                              </>
                            )}
                          </form>
                        </div>
                        <div className="review_box">
                          {comments && comments.length > 0 ? (
                            <div>
                              <h4>Comments:</h4>
                              {comments.map((comment, index) => (
                                <div className="review_comments" key={index}>
                                  <h6>name: {comment.userName}</h6>
                                  <div>
                                    {/* Rating:{" "} */}
                                    {comment.rating == 1 ? (
                                      <i className="ri-star-fill"></i>
                                    ) : comment.rating == 2 ? (
                                      <div>
                                        <i className="ri-star-fill"></i>

                                        <i className="ri-star-fill"></i>
                                      </div>
                                    ) : comment.rating == 3 ? (
                                      <div>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>

                                        <i className="ri-star-fill"></i>
                                      </div>
                                    ) : comment.rating == 4 ? (
                                      <div>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>

                                        <i className="ri-star-fill"></i>
                                      </div>
                                    ) : (
                                      <div>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>

                                        <i className="ri-star-fill"></i>
                                      </div>
                                    )}
                                  </div>
                                  <p>{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p>No comments available</p>
                          )}
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
      </Helmet>
    </section>
  );
};

export default ProductDetails;
