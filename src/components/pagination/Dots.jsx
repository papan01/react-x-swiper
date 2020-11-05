import React from 'react';
import PropTypes from 'prop-types';
import Dot from './Dot';
import './style.scss';

function Dots({
  slideLength,
  currentIndex,
  setCurrentIndex,
  CustomDot,
  PagingWrapper,
}) {
  const dots = [];
  for (let i = 0; i < slideLength; i += 1) {
    const dot = CustomDot ? (
      <CustomDot
        key={`dot-${i}`}
        onClick={() => {
          setCurrentIndex(i);
        }}
        active={currentIndex === i}
      />
    ) : (
      <Dot
        key={`dot-${i}`}
        className="swiper-pagination-dot"
        content={i + 1}
        active={currentIndex === i}
        onClick={() => {
          setCurrentIndex(i);
        }}
      />
    );
    dots.push(dot);
  }
  return PagingWrapper ? (
    <PagingWrapper dots={dots} />
  ) : (
    <div className="swiper-pagination">{dots}</div>
  );
}

Dots.propTypes = {
  slideLength: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  CustomDot: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  PagingWrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Dots.defaultProps = {
  CustomDot: null,
  PagingWrapper: null,
};

export default React.memo(Dots);
