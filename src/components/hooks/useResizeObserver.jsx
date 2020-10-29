import { useEffect } from 'react';
import PropTypes from 'prop-types';

function useResizeObserver(ref, callback) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      callback(entries);
    });

    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [callback, ref]);
}

useResizeObserver.propTypes = {
  ref: PropTypes.node.isRequired,
  callback: PropTypes.func,
};

useResizeObserver.defaultProps = {
  callback: () => {},
};

export default useResizeObserver;
