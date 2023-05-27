import React, { useState, useRef, useEffect } from "react";
import "../../styles/productdetails.css";
import Helmet from "../../components/helmet/helmet";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../../components/ui/Commonsection";
import { useParams } from "react-router-dom";
// import products from "../../assets/data/products";
import { motion } from "framer-motion";
import ProductList from "../../components/ui/ProductList";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useGetData from "../../customhook/useGetData";
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
// import useGetData from "../../customhook/useGetData";
import { cart_Action } from "../../redux/slicer/cart_slice";
const ProductDetails = () => {
  // const { data: products, loading } = useGetData("products");

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const [product, setProduct] = useState({});
  const [tab, settab] = useState("desc");
  const [rating, setrating] = useState();
  const { id } = useParams();
  const { data: products } = useGetData("products");

  const docRef = doc(db, "products", id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("no products");
      }
    };
    getProduct();
  }, []);
  // const product = products.find((item) => item.id === id);
  const {
    imgUrl,
    category,
    productName,
    price,
    // avgRating,
    // reviews,
    description,
    shortDesc,
  } = product;
  const relatedproduct = products.filter((item) => item.category == category);
  const reviewuser = useRef("");
  const reviewMsg = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewusername = reviewuser.current.value;
    const reviewuserMsg = reviewMsg.current.value;

    const reviewobj = {
      userName: reviewusername,
      text: reviewuserMsg,
      rating,
    };
    console.log(reviewobj);
  };
  const addTocart = () => {
    dispatch(
      cart_Action.addItems({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("added to cart ");
  };
  return (
    <section className="head">
      <Helmet>
        {/* <CommonSection title={productName} /> */}
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <div className="product_img mt-4">
                  <img src={imgUrl} alt="img"></img>
                </div>
              </Col>
              <Col lg="6">
                <div className="product_details ">
                  <h3>{productName}</h3>
                  <div className="product_rating">
                    <div className="star">
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                    </div>
                    {/* <p>{`(${avgRating}Rating)`}</p> */}
                  </div>
                  <span className="price">{`₹${price}`}</span>
                  <p>{shortDesc}</p>
                  <motion.button
                    onClick={addTocart}
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
                    onClick={() => settab("desc")}
                  >
                    Description
                  </h6>
                  <h6
                    className={`${tab === "rev" ? "active" : ""}`}
                    onClick={() => settab("rev")}
                  >
                    {/* Review({reviews.length}) */}
                  </h6>
                </div>

                {tab === "desc" ? (
                  <div className="tab_content">
                    <p>{description}</p>
                  </div>
                ) : (
                  <div className="product_review">
                    <div className="review_wrapper">
                      {/* <ul>
                        {reviews.map((item, index) => (
                          <li key={index}>
                            <span>{item.rating} (rating)</span>
                            <p>{item.text}</p>
                          </li>
                        ))}
                      </ul> */}
                      <div className="review_form mx-5">
                        <form onSubmit={handleSubmit}>
                          <h4 className="d-block">Leave your comments</h4>
                          <div className="form_grp">
                            <input
                              ref={reviewuser}
                              
                              type="text"
                              required
                              placeholder="enter name"
                            />
                          </div>
                          <div className="form_grp d-flex align-items-center gap-1">
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setrating(1)}
                            >
                              1 <i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setrating(2)}
                            >
                              2<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setrating(3)}
                            >
                              3<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setrating(4)}
                            >
                              4<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setrating(5)}
                            >
                              5<i class="ri-star-s-fill"></i>
                            </motion.span>
                          </div>
                          <div className="form_grp">
                            <textarea
                              placeholder="review"
                              rows={5}
                              ref={reviewMsg}
                              required
                              typeof="text"
                            ></textarea>
                          </div>
                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            className="submit"
                            type="submit"
                          >
                            submit
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
              <ProductList data={relatedproduct} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </section>
  );
};
export default ProductDetails;
