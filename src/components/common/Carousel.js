import React, { useState, useEffect } from 'react';
import '../../assets/carousel.css';

import img3 from '../../assets/images/group front.jpg';
import img4 from '../../assets/images/group back.jpg';
import img5 from '../../assets/images/whole group.jpg';
import img6 from '../../assets/images/sitting.jpg'
const Carousel = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((index + slides.length - 1) % slides.length);
  };

  const nextSlide = () => {
    setIndex((index + 1) % slides.length);
  };

  const changeSlide = () => {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
      dots[i].classList.remove('active1');
    }

    slides[index].style.display = 'block';
    dots[index].classList.add('active1');
  };

  const slides = [
    {
      src:`${img3}`,
      style: { background: 'dodgerBlue' },
    },
    {
      src: `${img4}`,
      style: { background: 'coral' },
    },
    {
      src: `${img5}`,
      style: { background: 'crimson' },
    },
    {
      src: `${img6}`,
      style: { background: '#6edf10' },
    },
  ];

  const dots = slides.map((slide, i) => (
    <span
      key={i}
      className={`dot ${i === index ? 'active1' : ''}`}
      onClick={() => setIndex(i)}
    />
  ));


  // Empty dependency array ensures cleanup only once

  return (
    <div id="slider">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="slide"
          style={{
            ...slide.style,
            display: i === index ? 'block' : 'none',
          }}
        >
          <img src={slide.src} alt="ddd" />
        </div>
      ))}

      <span className="controls" onClick={prevSlide} id="left-arrow">
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
      </span>

      <span className="controls" id="right-arrow" onClick={nextSlide}>
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </span>

      <div id="dots-con">{dots}</div>
    </div>
  );
};

export default Carousel;
