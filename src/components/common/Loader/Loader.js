import React from 'react';
import PropTypes from 'prop-types';

function Loader(props) {
  const { isLoading, children } = props;
  return isLoading ? <h5>Loading...</h5> : children;
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Loader;
