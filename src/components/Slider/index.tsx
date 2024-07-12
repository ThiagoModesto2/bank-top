"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./styles.module.css";

export const Slide = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    cssEase: "linear",
    autoplay: true,
  };

  return (
    <div className={styles.slideContainer}>
      <Slider {...settings}>
        <div>
          <img src="banner1.png" alt="Slide 1" />
        </div>
        <div>
          <img src="banner2.png" alt="Slide 2" />
        </div>
        <div>
          <img src="banner3.png" alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
