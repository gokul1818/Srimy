import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
// import produimg from "../assets/Makerly.png";
// import "../styles/allproduct.css";
// import useGetData from "../customhook/useGetData";
// import { db } from "../firebase.config";
import { db } from "../../firebase.config";
import useGetData from "../../customhook/useGetData";
import { toast } from "react-toastify";
import { doc, deleteDoc } from "firebase/firestore";
import Limited_card from "./limited_card";
const LimitedOffer = () => {
  // const textRef = useRef(null);
  const { data: productData, loading } = useGetData(`limitedOffers`);
  // const deleteProduct = async (id) => {
  //   await deleteDoc(doc(db, "limitedOffers", id));
  //   toast.success("product deleted");
  // };
  // console.log(productData)

  return (
    <>
      {productData.map((item, index) => (
        
        <Limited_card item={item} key={index} />
      ))}
    </>
  );
};

export default LimitedOffer;
