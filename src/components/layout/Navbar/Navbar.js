import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min';
import './Navbar.css';

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function Navbar(props) {
  const { cart } = props;

  useEffect(() => {
    const el = document.querySelectorAll('.sidenav');
    M.Sidenav.init(el, {});
  });

  useEffect(() => {
    const el = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(el, {});
  });

  return (
    <div className="Navbar">
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper grey darken-4">
            <a href="#0" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <Link to="/" className="brand-logo center hide-on-large-only">
              <img
                src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1547408948/insapient/logo/logo.png"
                alt="Insapient Logo"
              />
            </Link>
            <Link to="/cart" className="right hide-on-med-and-up">
              <i className="fas fa-shopping-cart mobile-cart" />
              {cart.count > 0 && <span className="mobile-cart-count">{cart.count}</span>}
            </Link>
            <div className="row hide-on-med-and-down">
              <div className="col offset-s2 s1">
                <Link to="/band">Band</Link>
              </div>
              <div className="col s1">
                <Link to="/songs">Songs</Link>
              </div>
              <div className="col s1">
                <Link to="/videos">Videos</Link>
              </div>
              <div className="col s2">
                <Link to="/" className="brand-logo center">
                  <img
                    src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1547408948/insapient/logo/logo.png"
                    alt="Insapient Logo"
                  />
                </Link>
              </div>
              <div className="col s1">
                <Link to="/gigs">Gigs</Link>
              </div>
              <div className="col s1">
                <Link to="/lyrics">Lyrics</Link>
              </div>
              <div className="col s1">
                <Link to="/merch">Merch</Link>
              </div>
              <div className="col s2">
                <Link to="/cart">
                  <i className="fas fa-shopping-cart desktop-cart" />
                  {cart.count > 0 && <span className="desktop-cart-count">{cart.count}</span>}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <ul className="sidenav grey darken-4" id="mobile-demo">
        <li>
          <Link to="/" className="sidenav-close">
            Home
          </Link>
        </li>
        <li>
          <Link to="/band" className="sidenav-close">
            Band
          </Link>
        </li>
        <li>
          <Link to="/songs" className="sidenav-close">
            Songs
          </Link>
        </li>
        <li>
          <Link to="/videos" className="sidenav-close">
            Videos
          </Link>
        </li>
        <li>
          <Link to="/gigs" className="sidenav-close">
            Gigs
          </Link>
        </li>
        <li>
          <Link to="/lyrics" className="sidenav-close">
            Lyrics
          </Link>
        </li>
        <li>
          <Link to="/merch" className="sidenav-close">
            Merch
          </Link>
        </li>
      </ul>
    </div>
  );
}

Navbar.propTypes = {
  cart: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Navbar);
