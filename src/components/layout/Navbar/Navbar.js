import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navbar.css';

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function Navbar(props) {
  const { cart } = props;

  function toggleSideNav() {
    const mainNav = document.querySelector('.main-nav');
    mainNav.classList.toggle('desktop-nav');
  }

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(navItem => {
      navItem.addEventListener('click', () => {
        toggleSideNav();
      });
    });
  }, []);

  return (
    <nav className="navbar">
      <span className="navbar-toggle" onClick={toggleSideNav}>
        <i className="fas fa-bars" />
      </span>
      <div className="logo">
        <img
          src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1547408948/insapient/logo/logo.png"
          alt="Insapient Logo"
        />
      </div>
      <ul className="main-nav" role="navigation">
        <li className="nav-item">
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/band">Band</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/songs">Songs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/videos">Videos</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/gigs">Gigs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/lyrics">Lyrics</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/merch">Merch</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/cart">
            Cart
            {cart.count > 0 && <span> ({cart.count})</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  cart: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Navbar);
