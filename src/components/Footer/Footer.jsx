import React from "react";
import "../Footer/Footer.css";
import { Container, Col, Row, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/Makerly.png";
import { Link } from "react-router-dom";
import logo1 from '../../assets/logo.png' 

const Footer = () => {
  const year= new Date().getFullYear()
  return (

    <section className="footer">
      <Container>
        <Row>
          <Col lg="4">
            <div className="logo">
              <img src={logo1} alt="logo"></img>
              <div>
                <h2><img src={logo} alt="logo"></img></h2>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam
              similique officiis quo praesentium molestiae provident minima
              suscipit repellendus hic.
            </p>
          </Col>
          <Col lg="3" xs='6'>
            <div className="footer_links">
              <h4>Top Categories</h4>
              <>
                <ListGroupItem className="ps-2">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                  >
                    toy{" "}
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="#"
                  >
                    gift
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2 ">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="#"
                  >
                    lithophane
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2 ">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="#"
                  >
                    quiz
                  </Link>
                </ListGroupItem>
              </>
            </div>
          </Col>
          <Col lg="2" xs='6'>
          <div className="footer_links">
              <h4>Link</h4>
              <>
                <ListGroupItem className="ps-2">
                  <Link
                  to='/cart'
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                  >
                 cart{" "}
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="/Shop"
                  >
                    Shop
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2 ">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="/Login"
                  >
                    Login
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2 ">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="#"
                  >
                  Privacy policy
                  </Link>
                </ListGroupItem>
              </>
            </div>
          </Col>
          <Col lg="3" xs='12'>
          <div className="footer_links">
              <h4>Contact</h4>
              <>
                <ListGroupItem className="ps-2">
                  <Link
                  to='https://instagram.com/mr_rider.18?igshid=ZGUzMzM3NWJiOQ=='
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                  >
                <i class="ri-instagram-line me-2"></i>
                <span>Instagram</span>
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="/Shop"
                  >
                  <i class="ri-phone-line me-2"></i>
                  <span> 044 2364 0923</span>
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2 ">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="/Login"
                  >
                    <i class="ri-whatsapp-line me-2"></i>
                    <span> 9037679268</span>
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2 ">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="#"
                  >
                    <i class="ri-mail-line me-2"></i>
                  <span>Makerly@gmail.com</span>
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-2 ">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      color: "#dedede",
                    }}
                    to="#"
                  >
                    <i class="ri-map-pin-fill me-2"></i>
                  <span>chennai</span>
                  </Link>
                </ListGroupItem>
              </>
            </div>
          </Col>
          <Col>
          <p className="text-center  mb-0"> copy rights {year} developed by gokul. All rights reserved</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Footer;
