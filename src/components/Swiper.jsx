import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwiperWrapper from './SwiperWrapper';
import defaultProps from './defaultProps';
import Dots from './pagination/Dots';
import './swiper.scss';

function Swiper({
  children,
  touchThreshold,
  duration,
  pagination,
  CustomDot,
  PagingWrapper,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideLength, setSlideLength] = useState(0);
  useEffect(() => {
    setSlideLength(React.Children.toArray(children).length);
  }, [children]);
  return slideLength > 0 ? (
    <div className="swiper-container">
      <SwiperWrapper
        slideLength={slideLength}
        touchThreshold={touchThreshold}
        duration={duration}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      >
        {children}
      </SwiperWrapper>
      {pagination && slideLength > 1 ? (
        <Dots
          slideLength={slideLength}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          CustomDot={CustomDot}
          PagingWrapper={PagingWrapper}
        />
      ) : null}
    </div>
  ) : null;
}

Swiper.propTypes = {
  children: PropTypes.node.isRequired,
  touchThreshold: PropTypes.number,
  duration: PropTypes.number,
  pagination: PropTypes.bool,
  CustomDot: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  PagingWrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Swiper.defaultProps = defaultProps;
export default Swiper;
