import React from "react";
import { Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Wishlist } from "../../redux/slicer/wishlist";
import "../../styles/ProductCard.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const ProductCard = ({ item, loading }) => {
  const [change, setChange] = useState();
  const dispatch = useDispatch();
  const wishlist_item = useSelector((state) => state.wishlist.WishlistItems);


  useEffect(() => {
    const isWishlistItem = wishlist_item.some(
      (wishlistItem) => wishlistItem.id === item.id
    );
    setChange(isWishlistItem);
  }, [wishlist_item]);

  const toggleWishlist = (e) => {
    e.preventDefault();
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


  return (
    <Col lg="3" md="4" sm="6" xs="6" className="">
      <section className="caard">
        <motion.div
          // whileTap={{ scale: 1.1, transition: { duration: 0.3 } }}
          className="products_items"
        >
          <motion.span className="Wishlist_delete">
            {change ? (
              <div className="Wishlist_border">
                <motion.div
                  onClick={toggleWishlist}
                  whileTap={{ scale: 1.3 }}
                  style={{ color: "red" }}
                >
                  <i class="ri-heart-3-fill"></i>
                </motion.div>
              </div>
            ) : (
              <div className="Wishlist_border">
                <motion.div onClick={toggleWishlist} whileTap={{ scale: 1.2 }}>
                  <i class="ri-heart-3-fill"></i>
                </motion.div>
              </div>
            )}
          </motion.span>

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
              <span className="">{item.category}</span>
              <span className="ps-2 text-decoration-line-through text-success ">
                MRP: ₹{item.mrp}
              </span>
            </div>
          </Link>
        </motion.div>
          <div className="product_bottom ">
            <div>
              <span>₹{item.price}</span>
            </div>
          </div>
      </section>
    </Col>
  );
};
export default ProductCard;
