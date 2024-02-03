import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGetData from "../../customhook/useGetData";
const SwipperImg = () => {
  // const { data: swipper, loading } = useGetData(`swipperImg`);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const loading = false;
  const swipper = [
    {
      imageUrl:
        "https://assets.newatlas.com/dims4/default/74c9a2a/2147483647/strip/true/crop/2000x1125+0+188/resize/1200x675!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Fdb%2Fe5%2Ffe59c7c24f15884adbdc3ec8304d%2Fgears.jpg",
    },
    {
      imageUrl:"https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2dlYXJzLTEuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0=",
    },
  ];

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
