import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import useResizeObserver from './hooks/useResizeObserver';
import { getTransitionStyle, getTransformStyle, resetPosition } from './utils';

function SwiperWrapper({
  children,
  slideLength,
  touchThreshold,
  duration,
  currentIndex,
  setCurrentIndex,
}) {
  const [slideWidth, setSlideWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [touchX, setTouchX] = useState({
    startX: 0,
    currentX: 0,
  });
  const [transformX, setTransformX] = useState(0);
  const [transitionStyle, setTransitionStyle] = useState({});
  const [transformStyle, setTransformStyle] = useState({});
  const [ref, { contentRect }] = useResizeObserver();

  useEffect(() => {
    if (contentRect) {
      setSlideWidth(contentRect.width);
    }
  }, [contentRect]);

  const onMouseDown = useCallback(e => {
    const x = e.touches ? e.touches[0].pageX : e.clientX;
    setTouchX({ startX: x, currentX: x });
    setDragging(true);
  }, []);

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
  ]);

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
      onTouchStart={onMouseDown}
      onTouchMove={dragging ? onMouseMove : null}
      onTouchEnd={onMouseEnd}
      onTouchCancel={onMouseEnd}
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
};

export default SwiperWrapper;
