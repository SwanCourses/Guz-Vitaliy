/**
 * Created by administrator on 26.09.16.
 */

import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, SET_GROUP } from './ProductActions';
import { Groups } from '../../../Common/Consts';

// Initial State
const initialState = { data: [], searchQuery: '', group: '' };

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

    case SET_GROUP:
      return {
        ...state,
        group: getGroupNameByUrl(action.groupUrl)
      };

    default:
      return state;
  }
};

/* Selectors */

export const getGroupNameByUrl = (groupUrl) =>{
  var groupName = ''
  if (groupUrl !== '') {
    var findGroup = Groups.filter(group => group.url === groupUrl);
    if (findGroup.length > 0) {
      groupName = findGroup[0].name
    }
  }
  return groupName
}

// Get all products
export const getProducts = (state, name = '', group = '', category = '') => {
  name = name.trim()
  return state.products.data.filter(product =>
    (name === '' || `${product.name} ${product.price}`.indexOf(name) > -1) &&
    (group === '' || product.group === group)
  );
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
