import React from 'react';
import PropTypes from 'prop-types';
import SwiperWrapper from './SwiperWrapper';
import './swiper.scss';

function Swiper({ children, touchThreshold }) {
  return (
    <div className="swiper-container">
      <SwiperWrapper
        slideLength={children.length}
        touchThreshold={touchThreshold}
      >
        {children}
      </SwiperWrapper>
    </div>
  );
}

Swiper.propTypes = {
  children: PropTypes.node.isRequired,
  touchThreshold: PropTypes.number,
};

Swiper.defaultProps = {
  touchThreshold: 5,
};

export default Swiper;
