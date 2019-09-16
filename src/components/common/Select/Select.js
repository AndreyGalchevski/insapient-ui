import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

import './Select.css';

function Select(props) {
  const { value, placeholder, onChange, options } = props;

  const customStyles = {
    control: styles => ({
      ...styles,
      borderColor: 'transparent',
      '&:hover': { borderColor: '#9e9e9e' },
      boxShadow: 'none',
      width: 300
    }),
    option: styles => ({
      ...styles,
      width: 300
    }),
    menu: styles => ({
      ...styles,
      width: 300
    })
  };

  return (
    <div className="select-container">
      <ReactSelect
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        options={options}
        styles={customStyles}
      />
    </div>
  );
}

Select.propTypes = {
  value: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }))
    .isRequired
};

Select.defaultProps = {
  value: {}
};

export default Select;
