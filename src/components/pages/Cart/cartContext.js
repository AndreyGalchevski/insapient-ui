import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './cartReducer';

const CartContext = createContext({});

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider(props) {
  const { children } = props;
  return (
    <CartContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
