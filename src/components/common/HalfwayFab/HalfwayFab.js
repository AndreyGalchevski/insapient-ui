import React from 'react';
import PropTypes from 'prop-types';

import './HalfwayFab.css';

function HalfwayFab(props) {
  const { children } = props;
  return (
    <button type="button" className="halfway-fab">
      {children}
    </button>
  );
}

HalfwayFab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default HalfwayFab;
