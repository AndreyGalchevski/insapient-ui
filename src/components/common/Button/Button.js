import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

function Button(props) {
  const { text, type, onClick } = props;

  return (
    <div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="btn" type={type} onClick={onClick}>
        <span>{text}</span>
      </button>
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  onClick: PropTypes.func
};

Button.defaultProps = {
  onClick: () => {}
};

export default Button;
