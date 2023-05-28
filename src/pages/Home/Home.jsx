import React, { useEffect, useState } from "react";
import Helmet from "../../components/helmet/helmet";
import { Container, Row, Col } from "reactstrap";

import "../../styles/home.css";
import { Link } from "react-router-dom";
import Clock from "../../components/ui/Clock";
import { motion } from "framer-motion";
import Service from "../../service/service";
import ProductList from "../../components/ui/ProductList";
// import products from "../../assets/data/products";
import useGetData from "../../customhook/useGetData";

import LimitedOffer from "../../components/ui/limitedOffers";
import SwipperImg from "../../components/ui/swipperImg";

const Home = () => {
  const { data: products, loading } = useGetData("products");
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestProducts, setbestProducts] = useState([]);
  const [newArrivals, setnewArrivals] = useState([]);

  useEffect(() => {
    const filteredTrending = products.filter(
      (items) => items.category === "chair"
    );
    const filteredbest = products.filter((items) => items.category === "sofa");
    const filternew = products.filter((items) => items.category === "mobile");
    setTrendingProducts(filteredTrending);
    setbestProducts(filteredbest);
    setnewArrivals(filternew);
  }, [products]);
  // const year = new Date().getFullYear();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  // const { data: productData } = useGetData(`swipperImg`);
  return (
    <div>
      <Helmet title={"Home"}>
        <section className="section">
          {/* {data.map((item, index) => (
          ))} */}
          <SwipperImg />

          <Container>
            <Row>
              {/* <Col lg="12">
              
              </Col> */}

              {/* <Col lg="6" md="6">
                <div className="content mt-3">
                  <p className="subtitle mb-0 ">latest Products in {year}</p>
                  <h2 className="heading">
                    Additive manufacturing process that creates a physical
                    object from a digital design
                  </h2>
                  <p className="content_sub">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perspiciatis vitae harum natus nisi nam cumque nostrum
                    consequuntur distinctio neque iure.
                    </p>
                  <motion.button whileTap={{ scale: 1.2 }} className="shop_btn">
                    <Link
                      style={{
                        textDecorationLine: "none",
                        color: "white",
                      }}
                      to="Shop"
                    >
                      Shop Now
                    </Link>
                  </motion.button>
                </div>
              </Col>
              <Col ld="6" md="6">
                <div className="hero_img ">
                  <img className="" src={hero_img} alt="img"></img>
                  </div>
              </Col> */}
            </Row>
          </Container>
        </section>
        <section className="trending_sale">
          <Container>
            <Row>
              <Col lg="12">
                <h1 className="text-center m-5 text-capitalize fs-2 fw-bold  ">
                  Trending Products
                </h1>
              </Col>

              <ProductList data={trendingProducts} loading={loading} />
            </Row>
          </Container>
        </section>
        <section className="limited offer">
          <Container>
            <Row>
              <Col lg="12">
                <h1 className="text-center m-5 text-capitalize fs-2 fw-bold ">
                  Limmited offers
                </h1>
              </Col>

              <LimitedOffer />
            </Row>
          </Container>
        </section>
        <Service />

        <section className="best_sale">
          <Container>
            <Row>
              <Col lg="12">
                <h3 className="text-center m-5 text-capitalize fs-2 fw-bold">
                  Best Products
                </h3>
              </Col>
              <ProductList data={bestProducts} loading={loading} />
            </Row>
          </Container>
        </section>
        <section className="counter_page mt-3">
          {/* <Container>
            <Row>
              <Col className="mt-5" lg="6" md="6">
                <div className="clock_content">
                  <h4>Limited Offers</h4>
                  <h3> sofa Chair</h3>
                </div>
                {/* <Clock /> 
                <div className="text-start ms-5 mt-3">
                  <button className="counter_btn  ">
                    <Link
                      style={{
                        textDecorationLine: "none",
                        color: "white",
                      }}
                      to="/shop"
                    >
                      visit store
                    </Link>
                  </button>
                </div>
              </Col>
              <Col className="text-end" lg="6" md="6">
                <img src={countertimer} alt="img"></img>
              </Col>
            </Row>
          </Container> */}
        </section>
        <section className="newarrivals_sale">
          <Container>
            <Row>
              <Col lg="12">
                <h3 className="text-center m-5 text-capitalize fs-2 fw-bold">
                  New Arrivals Products
                </h3>
              </Col>
              <ProductList data={newArrivals} loading={loading} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};
export default Home;
