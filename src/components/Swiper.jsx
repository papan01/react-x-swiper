import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwiperWrapper from './SwiperWrapper';
import './swiper.scss';

function Swiper({ children, touchThreshold, duration }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="swiper-container">
      <SwiperWrapper
        slideLength={children.length}
        touchThreshold={touchThreshold}
        duration={duration}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      >
        {children}
      </SwiperWrapper>
      <div className="swiper-pagination">
        {React.Children.map(children, (_, index) => (
          <span
            className={`swiper-pagination-dot ${
              currentIndex === index ? 'active' : null
            }`}
            onClick={() => setCurrentIndex(index)}
            role="button"
            aria-hidden="true"
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

Swiper.propTypes = {
  children: PropTypes.node.isRequired,
  touchThreshold: PropTypes.number,
  duration: PropTypes.number,
};

Swiper.defaultProps = {
  touchThreshold: 5,
  duration: 500,
};

export default Swiper;
