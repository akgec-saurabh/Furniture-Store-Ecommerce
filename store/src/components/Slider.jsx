import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

import { Autoplay, Pagination } from "swiper/modules";

const Slider = () => {
  const isMobile = window.matchMedia("(max-width:720px)").matches;
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
          <img
            className="slider_image"
            src={
              isMobile
                ? "https://savoy.nordicmade.com/wp-content/uploads/2015/08/slider-pendant-lighting-alt.jpg"
                : "https://savoy.nordicmade.com/wp-content/uploads/2015/08/slider-pendant-lighting.jpg"
            }
            alt="clock"
          />
          <div
            className={`slider_text first ${
              activeSlide === 0 ? "fade-in" : ""
            }`}
          >
            <div className="text_head">Contemporary Pendant Lighting</div>
            <div className="text_desc">
              <a href="#">Interior</a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="slider_image"
            src={
              isMobile
                ? "https://savoy.nordicmade.com/wp-content/uploads/2015/08/slider-wall-clock-alt.jpg"
                : "https://savoy.nordicmade.com/wp-content/uploads/2015/08/slider-wall-clock.jpg"
            }
            alt="clock"
          />
          <div className={`slider_text ${activeSlide === 1 ? "fade-in" : ""}`}>
            <div className="text_head">Minimal Rotating Disc Wall Clock</div>
            <div className="text_desc">
              <a href="#">Decoration</a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="slider_image"
            src={
              isMobile
                ? "https://savoy.nordicmade.com/wp-content/uploads/2015/08/slider-basket-alt.jpg"
                : "https://savoy.nordicmade.com/wp-content/uploads/2015/08/slider-basket.jpg"
            }
            alt="basket"
          />
          <div className={`slider_text ${activeSlide === 2 ? "fade-in" : ""}`}>
            <div className="text_head">Bamboo Zigzag Pattern Basket</div>
            <div className="text_desc">
              <a href="#">Essentials</a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
