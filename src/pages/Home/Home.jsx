import React, { useEffect, useState } from "react";
import Helmet from "../../components/helmet/helmet";
import { Container, Row, Col } from "reactstrap";
import hero_img from "../../assets/hero.jpeg";
import hero_img1 from "../../assets/hero1.jpg";
import hero_img2 from "../../assets/hero2.jpg";

import "../../styles/home.css";
import { Link } from "react-router-dom";
import Clock from "../../components/ui/Clock";
import { motion } from "framer-motion";
import Service from "../../service/service";
import ProductList from "../../components/ui/ProductList";
// import products from "../../assets/data/products";
import useGetData from "../../customhook/useGetData";
import countertimer from "../../assets/images/counter-timer-img.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LimitedOffer from "../../components/ui/limitedOffers";

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
  const year = new Date().getFullYear();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const gradientColors = {
    start: "#ff8800", // Starting color
    end: "#ff0055", // Ending color
  };
  return (
    <div>
      <Helmet title={"Home"}>
        <section className="section">
          <div className="mt-5 swipper">
            {/* <h1>Welcome to the Homepage</h1> */}
            <Slider {...settings}>
              <div className="swip">
                <img src={hero_img} alt="Image 1" />
              </div>
              <div className="swip">
                <img src={hero_img1} alt="Image 2" />
              </div>
              <div className="swip">
                <img src={hero_img2} alt="Image 3" />
              </div>
            </Slider>
          </div>
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
                <h1 className="text-center  ">Trending Products</h1>
              </Col>
              {/* <LimitedOffer /> */}
              <ProductList data={trendingProducts} />
            </Row>
          </Container>
        </section>
        <section className="limited offer">
          <Container>
            <Row>
              <Col lg="12">
                <h1 className="text-center m-5 ">Limmited offers</h1>
              </Col>
              <LimitedOffer />
              {/* <ProductList data={trendingProducts} /> */}
            </Row>
          </Container>
        </section>
        <Service />

        <section className="best_sale">
          <Container>
            <Row>
              <Col lg="12">
                <h3 className="text-center m-5">Best Products</h3>
              </Col>
              <ProductList data={bestProducts} />
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
                <h3 className="text-center m-5">New Arrivals Products</h3>
              </Col>
              <ProductList data={newArrivals} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};
export default Home;
