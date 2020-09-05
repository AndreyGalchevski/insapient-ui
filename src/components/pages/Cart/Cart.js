import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import qs from 'query-string';

import { deleteResource } from '../../../api/utils';
import { DELETE_ITEM_FROM_CART } from './cartActionTypes';
import { useCartContext } from './cartContext';
import Header from '../../common/Header/Header';
import Button from '../../common/Button/Button';

import './Cart.css';

function Cart(props) {
  const { location } = props;
  const [cart, dispatch] = useCartContext();

  useEffect(() => {
    async function cancelOrder() {
      const { token } = qs.parse(location.search);
      try {
        await deleteResource('orders', token);
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
                  onClick={() => dispatch({ type: DELETE_ITEM_FROM_CART, payload: item })}
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
  location: ReactRouterPropTypes.location.isRequired
};

export default Cart;
