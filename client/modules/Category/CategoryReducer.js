/**
 * Created by Vitaliy on 10.10.2016.
 */

import { ADD_CATEGORIES, ADD_CATEGORY } from './CategoryActions';

// Initial State
const initialState = { data: [] };

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_CATEGORIES:
      return {
        data: action.categories,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        data: [action.category, ...state.data],
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getCategories = state => state.categories.data;

// Get categories by existing products
export const getCategoriesByProducts = (state, products) =>
  state.categories.data.filter(category => [...new Set(products.map(product => product.category))].indexOf(category.cuid) !== -1);

// Get product by cuid
export const getCategory = (state, cuid) => state.categories.data.filter(category => category.cuid === cuid)[0];

// Export Reducer
export default CategoryReducer;
