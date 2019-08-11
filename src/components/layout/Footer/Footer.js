import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <div className="Footer">
    <footer className="grey darken-4 z-depth-4">
      <div>
        <div className="row">
          <div className="col s12">
            <div className="privacy-and-rights">
              <span>&copy; 2019 Insapient</span>
              <Link to="privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
