import React from 'react';
import PropTypes from 'prop-types';

function Dot({ content, className, active, onClick }) {
  return (
    <span
      className={`${className} ${active ? 'active' : ''}`}
      onClick={onClick}
      role="button"
      aria-hidden="true"
    >
      {content}
    </span>
  );
}

Dot.propTypes = {
  content: PropTypes.node.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Dot.defaultProps = {
  className: '',
};

export default Dot;
