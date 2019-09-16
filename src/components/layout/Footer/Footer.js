import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer>
      <span>&copy; 2019 Insapient</span>
      <Link to="privacy-policy">Privacy Policy</Link>
    </footer>
  );
}

export default Footer;
