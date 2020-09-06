import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

function Input(props) {
  const { type, name, value, disabled, onChange } = props;
  return (
    <div className="input-container">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={name}
        disabled={disabled}
        onChange={onChange}
        className="input"
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
