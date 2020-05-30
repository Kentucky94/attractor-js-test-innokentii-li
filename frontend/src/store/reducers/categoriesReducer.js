import {
  CREATE_CATEGORY_FAILURE,
  EDIT_CATEGORY_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORY_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
  categories: [],
  category: {},
  createError: null,
  editError: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type){
    case FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: action.categories};
    case FETCH_CATEGORY_SUCCESS:
      return {...state, category: action.category};
    case CREATE_CATEGORY_FAILURE:
      return {...state, createError: action.error};
    case EDIT_CATEGORY_FAILURE:
      return {...state, editError: action.error};
    default:
      return state;
  }
};

export default categoriesReducer;