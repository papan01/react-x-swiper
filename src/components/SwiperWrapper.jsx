import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import useResizeObserver from './hooks/useResizeObserver';
import useInterval from './hooks/useInterval';
import { getTransitionStyle, getTransformStyle, resetPosition } from './utils';

function SwiperWrapper({
  children,
  slideLength,
  touchThreshold,
  duration,
  currentIndex,
  setCurrentIndex,
  autoPlay,
  autoPlaySpeed,
  closeAutoPlayWhenClick,
  onSwipe,
}) {
  const [slideWidth, setSlideWidth] = useState(0);
  const [autoPlay_, setAutoPlay] = useState(autoPlay);
  const [dragging, setDragging] = useState(false);
  const [touchX, setTouchX] = useState({
    startX: 0,
    currentX: 0,
  });
  const [transformX, setTransformX] = useState(0);
  const [transitionStyle, setTransitionStyle] = useState({});
  const [transformStyle, setTransformStyle] = useState({});
  const [ref, { contentRect }] = useResizeObserver();
  const [autoPlaySpeed_, setAutoPlaySpeed] = useState(
    autoPlay ? autoPlaySpeed : null,
  );

  useEffect(() => {
    if (contentRect) {
      let contentRectWidth = contentRect.width;
      const bodyWidth = document?.body?.clientWidth;
      if (bodyWidth > 0)
        contentRectWidth = Math.min(contentRectWidth, bodyWidth);
      setSlideWidth(contentRectWidth);
    }
  }, [contentRect]);

  const onMouseDown = useCallback(
    e => {
      const x = e.touches ? e.touches[0].pageX : e.clientX;
      setTouchX({ startX: x, currentX: x });
      setDragging(true);
      setAutoPlaySpeed(null);
      if (closeAutoPlayWhenClick) setAutoPlay(false); // Strange requirement
    },
    [closeAutoPlayWhenClick],
  );

  const onMouseMove = useCallback(
    e => {
      const x = e.touches ? e.touches[0].pageX : e.clientX;
      setTouchX({ startX: touchX.startX, currentX: x });
    },
    [touchX.startX],
  );

  const onMouseEnd = useCallback(() => {
    setDragging(false);
    const res = resetPosition(
      slideLength,
      transformX,
      currentIndex,
      slideWidth,
      touchX.currentX,
      touchX.startX,
      touchThreshold,
      onSwipe,
    );
    setTransformX(res.transformX);
    setCurrentIndex(res.currentIndex);
    setTouchX({ startX: 0, currentX: 0 });
  }, [
    currentIndex,
    setCurrentIndex,
    slideLength,
    slideWidth,
    touchThreshold,
    touchX.currentX,
    touchX.startX,
    transformX,
    onSwipe,
  ]);

  const onMouseOver = useCallback(() => {
    setAutoPlaySpeed(null);
  }, []);

  const onMouseOut = useCallback(() => {
    setAutoPlaySpeed(autoPlaySpeed);
  }, [autoPlaySpeed]);

  useEffect(() => {
    setTransformX(currentIndex * slideWidth * -1);
  }, [currentIndex, slideWidth]);

  useEffect(() => {
    setTransformStyle(
      getTransformStyle(transformX, touchX.currentX, touchX.startX),
    );
  }, [touchX.currentX, touchX.startX, transformX]);

  useEffect(() => {
    let t;
    setTransitionStyle(getTransitionStyle(dragging, duration));
    if (dragging === false) {
      t = setTimeout(() => {
        setTransitionStyle(getTransitionStyle(false, 0));
      }, duration);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [dragging, duration, currentIndex]);

  useInterval(() => {
    if (autoPlay_) {
      let next = currentIndex + 1;
      if (next === slideLength) next = 0;
      setCurrentIndex(next);
    }
  }, autoPlaySpeed_);

  return (
    <div
      ref={ref}
      className="swiper-wrapper"
      style={
        slideWidth > 0
          ? { ...transitionStyle, ...transformStyle }
          : { left: -1000 }
      }
      role="presentation"
      onMouseDown={onMouseDown}
      onMouseMove={dragging ? onMouseMove : null}
      onMouseUp={onMouseEnd}
      onMouseLeave={onMouseEnd}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onTouchStart={onMouseDown}
      onTouchMove={dragging ? onMouseMove : null}
      onTouchEnd={onMouseEnd}
      onTouchCancel={onMouseEnd}
      onFocus={onMouseOver}
      onBlur={onMouseOut}
    >
      {React.Children.map(children, child => (
        <div className="swiper-slide" style={{ width: `${slideWidth}px` }}>
          {child}
        </div>
      ))}
    </div>
  );
}

SwiperWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  slideLength: PropTypes.number.isRequired,
  touchThreshold: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  autoPlaySpeed: PropTypes.number.isRequired,
  closeAutoPlayWhenClick: PropTypes.bool.isRequired,
  onSwipe: PropTypes.func.isRequired,
};

export default SwiperWrapper;
