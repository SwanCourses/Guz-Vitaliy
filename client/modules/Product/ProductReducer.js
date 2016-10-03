/**
 * Created by administrator on 26.09.16.
 */

import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY } from './ProductActions';
import { Groups } from '../../../Common/Consts';

// Initial State
const initialState = { data: [], searchQuery: '' };

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCTS:
      return {
        ...state,
        data: action.products,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        data: [action.product, ...state.data],
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getProducts = (state, name = '', groupUrl = '') => {
  name = name.trim()
  /*return name === '' ? state.products.data : state.products.data.filter(product =>  `${product.name} ${product.price}`.indexOf(name) > -1)*/
  var products = name === '' ? state.products.data : state.products.data.filter(product =>  `${product.name} ${product.price}`.indexOf(name) > -1)
  if (groupUrl !== '') {
    var findGroup = Groups.filter(group => group.url === groupUrl);
    if (findGroup.length > 0) {
      products = products.filter(product => product.group === findGroup[0].name)
    }
  }
  return products;
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
