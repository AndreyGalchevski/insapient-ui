import * as types from './cartActionTypes';

export function addItemToCart(item) {
  return { type: types.ADD_ITEM_TO_CART, payload: item };
}

export function deleteItemFromCart(item) {
  return { type: types.DELETE_ITEM_FROM_CART, payload: item };
}

export function clearCart() {
  return { type: types.CLEAR_CART };
}
