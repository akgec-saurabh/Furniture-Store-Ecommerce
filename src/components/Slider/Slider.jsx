import React, { useState } from "react";
import "./Slider.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

import { Autoplay, Pagination } from "swiper/modules";

import sliderPendantImage from "../../assets/slider-pendant-lighting.jpg";
import sliderClockImage from "../../assets/slider-wall-clock.jpg";
import sliderBasketImage from "../../assets/slider-basket.jpg";

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + ' ">' + "</span>";
    },
  };
  return (
    <div className="slider">
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination]}
        pagination={pagination}
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
      >
        <SwiperSlide>
          <div className={`slider_text ${activeSlide === 0 ? "fade-in" : ""}`}>
            <div className="text_head">Contemporary Pendant Lighting</div>
            <div className="text_desc">
              <a href="#">Interior</a>
            </div>
          </div>
          <img className="slider_image" src={sliderPendantImage} alt="clock" />
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider_text ${activeSlide === 1 ? "fade-in" : ""}`}>
            <div className="text_head">Minimal Rotating Disc Wall Clock</div>
            <div className="text_desc">
              <a href="#">Decoration</a>
            </div>
          </div>
          <img className="slider_image" src={sliderClockImage} alt="clock" />
        </SwiperSlide>
        <SwiperSlide>
          <div className={`slider_text ${activeSlide === 2 ? "fade-in" : ""}`}>
            <div className="text_head">Bamboo Zigzag Pattern Basket</div>
            <div className="text_desc">
              <a href="#">Essentials</a>
            </div>
          </div>
          <img className="slider_image" src={sliderBasketImage} alt="basket" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
