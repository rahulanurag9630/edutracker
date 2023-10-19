import React from 'react'
import img from '../../assets/images/brain-544403_1280.png'
import img2 from '../../assets/images/never-stop-learning-3653430_1280.jpg'


const Carousel = () => {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={img2}
            className="d-block w-100 carousel-image"
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://via.placeholder.com/800x400/ffc300/ffffff?text=Second+Slide"
            className="d-block w-100 carousel-image"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://via.placeholder.com/800x400/ff5733/ffffff?text=Third+Slide"
            className="d-block w-100 carousel-image"
            alt="Third slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://via.placeholder.com/800x400/ffc300/ffffff?text=Fourth+Slide"
            className="d-block w-100 carousel-image"
            alt="Fourth slide"
          />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
