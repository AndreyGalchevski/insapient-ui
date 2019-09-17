import * as types from './cartActionTypes';

export const initialState = {
  items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  count: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')).reduce((acc, item) => acc + item.quantity, 0)
    : 0,
  total: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')).reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    : 0
};

export function reducer(state, action) {
  switch (action.type) {
    case types.ADD_ITEM_TO_CART:
      localStorage.setItem('cart', JSON.stringify([...state.items, action.payload]));
      return {
        ...state,
        items: [...state.items, action.payload],
        count: state.count + action.payload.quantity,
        total: state.total + action.payload.price * action.payload.quantity
      };
    case types.DELETE_ITEM_FROM_CART:
      localStorage.setItem(
        'cart',
        JSON.stringify(state.items.filter(item => item.id !== action.payload.id))
      );
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        count: state.count - action.payload.quantity,
        total: state.total - action.payload.price * action.payload.quantity
      };
    case types.CLEAR_CART:
      localStorage.removeItem('cart');
      return {
        ...state,
        items: [],
        count: 0,
        total: 0
      };
    default:
      return state;
  }
}
