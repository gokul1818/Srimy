import React from "react";
import { Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { cart_Action } from "../../redux/slicer/cart_slice";
import "../../styles/ProductCard.css";
import { toast } from 'react-toastify';


const ProductCard = ({item}) => {


const dispatch =useDispatch();
const addTocart =()=>{
  dispatch(cart_Action.addItems({
    id:item.id,
    productName:item.productName,
    price:item.price,
    image:item.imgUrl
  }))
 toast.success('product added successfully')
}

  return (
    <Col  lg="3" md="4" sm='6' xs='6' className="">
      <section className="caard">

      <motion.div
        whileTap={{ scale: 1.1, transition: { duration: 0.3 } }}
        className="products_items"
        >
        <Link
          to={`/shop/${item.id}`}   
          style={{
            textDecorationLine: "none",
            color: "black",
          }}
        >
          <div className="products_img">
            <img src={item.imgUrl} alt="img"></img>
          </div>
          <div className="product_info">
            <h4>{item.productName}</h4>
            <span className="p-2">{item.category}</span>
            <span className="ps-2 text-decoration-line-through text-success ">MRP: ₹{item.mrp}</span>
          </div>
        </Link>
      </motion.div>
      <div className="product_bottom ">
        <span>₹{item.price}</span>
        <motion.span whileTap={{ scale: 1.2 }}>
          <i class="ri-add-fill" onClick={addTocart} ></i>
        </motion.span>
      </div>
        </section>
    </Col>
  );
};
export default ProductCard;
