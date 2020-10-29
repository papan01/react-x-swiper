import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import useResizeObserver from './hooks/useResizeObserver';
import { getTransformStyle, calculateTransformX, resetPosition } from './utils';

function SwiperWrapper({ children, slideLength, touchThreshold }) {
  const [slideWidth, setSlideWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [touchX, setTouchX] = useState({
    startX: 0,
    currentX: 0,
  });
  const [transformX, setTransformX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapper = useRef();

  useResizeObserver(wrapper, entries => {
    const debounceResizing = debounce(
      () =>
        setSlideWidth(entries.length > 0 && `${entries[0].contentRect.width}`),
      100,
    );
    debounceResizing();
  });

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
    slideLength,
    slideWidth,
    touchThreshold,
    touchX.currentX,
    touchX.startX,
    transformX,
  ]);

  return (
    <div
      ref={wrapper}
      className="swiper-wrapper"
      style={
        slideWidth > 0
          ? getTransformStyle(
              dragging,
              calculateTransformX(transformX, touchX.currentX, touchX.startX),
            )
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
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          className: 'swiper-slide',
          style: { width: `${slideWidth}px` },
        }),
      )}
    </div>
  );
}

SwiperWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  slideLength: PropTypes.number.isRequired,
  touchThreshold: PropTypes.number.isRequired,
};

export default SwiperWrapper;
