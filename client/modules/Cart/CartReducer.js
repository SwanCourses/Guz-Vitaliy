/**
 * Created by Vitaliy on 12.10.2016.
 */

import {
  ADD_TO_CART, REPLACE_CART, CACHE_KEY,
  REMOVE_FROM_CART, REMOVE_ALL_FROM_CART
} from './CartActions';

import {getProduct} from '../Product/ProductReducer';

// Initial State
const initialState = {};

const CartReducer = (state = initialState, action) => {
  let newCart;
  switch (action.type) {

    case ADD_TO_CART:
      newCart = state;
      let product = state[action.productCuid];
      let color
      let size
      let count = 1;
      if (product) {
        color = state[action.productCuid][action.productColor];
        if (color) {
          size = state[action.productCuid][action.productColor][action.productSize];
          if (size) {
            count = size.count + 1;
          }
        }
      }
      newCart = {
        ...state,
        [action.productCuid]: {
          ...product,
          [action.productColor]: {
            ...color,
            [action.productSize]: {
              ...size, count: count
            }
          }
        }
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REMOVE_FROM_CART:
      newCart = state;
      if (state[action.productCuid]) {
        let product = state[action.productCuid];
        let color = state[action.productCuid][action.productColor];
        let size = state[action.productCuid][action.productColor][action.productSize];
        let count = size.count - 1;
        if (count > 0) {
          newCart = {
            ...state,
            [action.productCuid]: {
              ...product,
              [action.productColor]: {
                ...color,
                [action.productSize]: {
                  ...size, count: count
                }
              }
            }
          }
        }
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REMOVE_ALL_FROM_CART:
      newCart = state;
      if (state[action.productCuid]) {
        delete state[action.productCuid][action.productColor][action.productSize];
        if (Object.getOwnPropertyNames(state[action.productCuid]).length === 0) {
          delete state[action.productCuid]
        }
        newCart = {...state}
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REPLACE_CART:
      return action.cart || state;

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getCart = state => state.cart;

export const getProductsCount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    return sum + parseFloat(Object.keys(state.cart[key]).reduce((sum, color) => {
        return sum + parseFloat(Object.keys(state.cart[key][color]).reduce((sum, size) => {
            return sum + parseFloat(state.cart[key][color][size].count);
          }, 0))
      }, 0))
  }, 0);
};

export const getOrdersAmount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    let product = getProduct(state, key);
    if (!product) return sum;
    return sum + parseFloat(Object.keys(state.cart[key]).reduce((sum, color) => {
        return sum + parseFloat(Object.keys(state.cart[key][color]).reduce((sum, size) => {
            return sum + parseFloat(state.cart[key][color][size].count);
          }, 0))
      }, 0)) * product.price;
  }, 0);
};

// Export Reducer
export default CartReducer;
