import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGetData from "../../customhook/useGetData";
const SwipperImg = () => {
  const { data: swipper, loading } = useGetData(`swipperImg`);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="swipper">
      {loading ? (
        <div className="Swipper_card">
          <div className="shine"></div>
         
          
        </div>
      ) : (
        <Slider {...settings}>
          {swipper.map((item, index) => (
            <div className="swip" key={index}>
              {/* <img src={item.imageUrl} alt="" /> */}
              {/* <img src={item.imageUrl} alt="" /> */}
              <img src={item.imageUrl} alt="" />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default SwipperImg;
