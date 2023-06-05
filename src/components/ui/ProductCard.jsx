import React from "react";
import { Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cart_Action } from "../../redux/slicer/cart_slice";
import { Wishlist } from "../../redux/slicer/wishlist";
import "../../styles/ProductCard.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
// import wishlist from "../../redux/slicer/wishlist";

const ProductCard = ({ item, loading }) => {
  const [change, setChange] = useState();
  const dispatch = useDispatch();
  const wishlist_item = useSelector((state) => state.wishlist.WishlistItems);

  console.log("first", wishlist_item);

  useEffect(() => {
    const isWishlistItem = wishlist_item.some(
      (wishlistItem) => wishlistItem.id === item.id
    );
    setChange(isWishlistItem);
  }, [wishlist_item]);

  const toggleWishlist = () => {
    if (change) {
      dispatch(Wishlist.deleteItems(item.id));
      toast.success("Product removed from the wishlist");
    } else {
      dispatch(
        Wishlist.addItems({
          id: item.id,
          productName: item.productName,
          price: item.price,
          image: item.imgUrl,
        })
      );
      toast.success("Product added to the wishlist");
    }
  };

  const addTocart = () => {
    dispatch(
      cart_Action.addItems({
        id: item.id,
        productName: item.productName,
        price: item.price,
        image: item.imgUrl,
      })
    );
    toast.success("product added to cart successfully");
  };
  // const addWishlist = () => {
  //   dispatch(
  //     Wishlist.addItems({
  //       id: item.id,
  //       productName: item.productName,
  //       price: item.price,
  //       image: item.imgUrl,
  //     })
  //   );
  //   toast.success("Wishlist added successfully");
  // };
  // const productdelete = () => {
  //   dispatch(Wishlist.deleteItems(item.id));
  //   toast.success("removed Wishlist successfully");
  // };

  return (
    <Col lg="3" md="4" sm="6" xs="6" className="">
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
              <span className="ps-2 text-decoration-line-through text-success ">
                MRP: ₹{item.mrp}
              </span>
            </div>
          </Link>
        </motion.div>
        <div className="product_bottom ">
          <span>₹{item.price}</span>
          <div>
            <motion.span whileTap={{ scale: 1.2 }}>
              <i class="ri-add-fill" onClick={addTocart}></i>
            </motion.span>
            <motion.span whileTap={{ scale: 1.2 }} onClick={toggleWishlist}>
              {change ? (
                <i class="ri-delete-bin-line"></i>
              ) : (
                <i class="ri-heart-fill"></i>
              )}
            </motion.span>
          </div>
        </div>
      </section>
    </Col>
  );
};
export default ProductCard;
