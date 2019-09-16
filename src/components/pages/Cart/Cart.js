import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import qs from 'query-string';

import makeRequest from '../../../api/apiClient';
import * as cartActions from './cartActions';
import { DELETE_ORDER } from '../../../api/queries';
import Header from '../../common/Header/Header';
import Button from '../../common/Button/Button';

import './Cart.css';

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(cartActions, dispatch)
  };
}

function Cart(props) {
  const { cart, deleteItemFromCart, location } = props;

  useEffect(() => {
    async function cancelOrder() {
      const { token } = qs.parse(location.search);
      try {
        await makeRequest({
          query: DELETE_ORDER,
          variables: {
            token
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (location.search) {
      cancelOrder();
    }
  }, []);

  return (
    <section className="cart">
      <Header pageTitle="Cart" />
      {cart.items.length > 0 ? (
        <div>
          <div className="items-container">
            {cart.items.map(item => (
              <div className="item" key={item.id}>
                <p>Item: {item.name}</p>
                <p>Type: {item.type}</p>
                {item.size && <p>Size: {item.size}</p>}
                <p>Price: {item.price} USD</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  className="trash-btn"
                  type="button"
                  onClick={() => deleteItemFromCart(item)}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            ))}
          </div>
          <div className="subtotal-and-shipping">
            <p>Subtotal: {cart.total} USD</p>
            <p>Shipping: 10 USD</p>
            <p className="shipping-info">(Standard shipping - 10-15 business days)</p>
            <hr />
            <p>Total: {cart.total + 10} USD</p>
          </div>
          <Link to="/checkout">
            <Button text="Checkout" type="button" />
          </Link>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-container">
            <h3>Sadly, there is nothing in the cart</h3>
            <p>
              Maybe you will find something in our <Link to="/merch">shop</Link>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  deleteItemFromCart: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
