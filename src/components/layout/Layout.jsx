import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import { Link } from "react-router-dom"
import Routers from "../../router/Routers";
const Layout = () => {
  return (
    <div>
       <Header/>
      <div>
        <Routers />
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
