import React, { useRef, useState } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const img = [
  "https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-classic-chair.jpg",
  "https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-classic-chair-2.jpg",
  "https://savoy.nordicmade.com/wp-content/uploads/2020/10/product-classic-chair-3.jpg",
];
function ProductDisplaySlider() {
  const swiperRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNavEnable, setIsNavEnable] = useState(false);

  //For showing and hiding nav
  const onMouseEnterHandler = () => {
    setIsNavEnable(true);
  };
  const onMouseLeaveHandler = () => {
    setIsNavEnable(false);
  };

  return (
    <div className="productDisplaySlider">
      <div
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <Swiper
          className="productDisplaySlider_swiper"
          spaceBetween={0}
          slidesPerView={1}
          navigation={isNavEnable}
          modules={[Navigation]}
          loop={true}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {img.map((imgPath) => (
            <SwiperSlide>
              <div className="productDisplaySlider_imgWrapper">
                <Image src={imgPath} alt="product" fill />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="productDisplaySlider_pagination">
        {img.map((imgPath, i) => (
          <Image
            className={activeIndex === i ? "active" : "notactie"}
            src={imgPath}
            alt="product"
            sizes="10vw"
            width={70}
            height={100}
            style={{ objectFit: "cover", cursor: "pointer" }}
            onClick={() => {
              swiperRef.current.slideTo(i);

              //Now changing the activeIndex State
              setActiveIndex(i);
              //Based on this index will change the class
              console.log(swiperRef);
              const demo = swiperRef.current.activeIndex === i ? "active" : "";
              console.log(demo);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductDisplaySlider;
