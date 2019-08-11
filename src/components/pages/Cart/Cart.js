import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';

import './Cart.css';

import makeRequest from '../../../api/apiClient';
import * as cartActions from './cartActions';
import { DELETE_ORDER } from '../../../api/queries';

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
    <section>
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">Cart</h4>
      <div className="container">
        {cart.items.length > 0 ? (
          <div className="row">
            {cart.items.map(item => (
              <div className="col s12 m4" key={item.id}>
                <div className="card">
                  <div className="card-content">
                    <p>Item: {item.name}</p>
                    <p>Type: {item.type}</p>
                    {item.size && <p>Size: {item.size}</p>}
                    <p>Price: {item.price} USD</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="card-action">
                    <button
                      type="button"
                      className="btn btn-flat"
                      onClick={() => deleteItemFromCart(item)}
                    >
                      <i className="fas fa-trash-alt" style={{ color: 'white' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="col s12">
              <p>Subtotal: {cart.total} USD</p>
              <p>Shipping: 10 USD</p>
              <p className="shipping-info">(Standard shipping - 10-15 business days)</p>
            </div>
            <div className="col s6 offset-s3">
              <hr />
            </div>
            <div className="col s12">
              <p>Total: {cart.total + 10} USD</p>
            </div>
            <div className="col s12">
              <Link to="/checkout" className="btn btn-flat">
                Checkout
              </Link>
            </div>
          </div>
        ) : (
          <h5>Sadly, there is nothing in the cart</h5>
        )}
      </div>
    </section>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
