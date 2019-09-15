import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

function Header(props) {
  const { pageTitle, isMobileOnly } = props;
  const className = isMobileOnly ? 'page-title' : 'desktop-page-title';
  return <h1 className={className}>{pageTitle}</h1>;
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  isMobileOnly: PropTypes.bool
};

Header.defaultProps = {
  isMobileOnly: true
};

export default Header;
