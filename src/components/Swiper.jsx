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
  autoPlay,
  autoPlaySpeed,
  curIndex,
  onDotClick,
  closeAutoPlayWhenClick,
  LeftArrow,
  RightArrow,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideLength, setSlideLength] = useState(
    React.Children.toArray(children).length,
  );
  useEffect(() => {
    setSlideLength(React.Children.toArray(children).length);
  }, [children]);

  useEffect(() => {
    const len = React.Children.toArray(children).length;
    if (currentIndex >= len && len !== 0) setCurrentIndex(len - 1);
  }, [children, currentIndex]);

  useEffect(() => {
    if (curIndex < 0) setCurrentIndex(0);
    else if (curIndex >= slideLength) setCurrentIndex(slideLength - 1);
    else setCurrentIndex(curIndex);
  }, [curIndex, slideLength]);

  return slideLength > 0 ? (
    <div className="swiper">
      <div className="swiper-container">
        <SwiperWrapper
          slideLength={slideLength}
          touchThreshold={touchThreshold}
          duration={duration}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          autoPlay={autoPlay}
          autoPlaySpeed={autoPlaySpeed}
          closeAutoPlayWhenClick={closeAutoPlayWhenClick}
        >
          {children}
        </SwiperWrapper>
        {LeftArrow && currentIndex > 0 && (
          <LeftArrow onClick={() => setCurrentIndex(currentIndex - 1)} />
        )}
        {RightArrow && currentIndex < slideLength - 1 && (
          <RightArrow onClick={() => setCurrentIndex(currentIndex + 1)} />
        )}
      </div>
      {pagination && slideLength > 1 ? (
        <Dots
          slideLength={slideLength}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          CustomDot={CustomDot}
          PagingWrapper={PagingWrapper}
          onDotClick={onDotClick}
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
  autoPlay: PropTypes.bool,
  autoPlaySpeed: PropTypes.number,
  curIndex: PropTypes.number,
  onDotClick: PropTypes.func,
  closeAutoPlayWhenClick: PropTypes.bool,
  LeftArrow: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  RightArrow: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Swiper.defaultProps = defaultProps;
export default Swiper;
