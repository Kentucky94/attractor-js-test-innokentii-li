import {push} from 'connected-react-router';

import axiosOrders from "../../axiosOrders";

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';
export const EDIT_CATEGORY_FAILURE = 'EDIT_CATEGORY_FAILURE';

export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});
export const fetchCategorySuccess = category => ({type: FETCH_CATEGORY_SUCCESS, category});
export const createCategoryFailure = error => ({type: CREATE_CATEGORY_FAILURE, error});
export const editCategoryFailure = error => ({type: EDIT_CATEGORY_FAILURE, error});

export const fetchCategories = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/categories');

      dispatch(fetchCategoriesSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchCategory = categoryId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get(`/categories/${categoryId}`);

      dispatch(fetchCategorySuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const createCategory = categoryData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/categories', categoryData);

      dispatch(push('/'))
    }catch(error){
      if(error.response){
        dispatch(createCategoryFailure(error.response.data))
      }else{
        dispatch(createCategoryFailure({global: 'No internet connection!'}))
      }
    }
  }
};

export const editCategory = (categoryId, categoryData) => {
  return async dispatch => {
    try{
      await axiosOrders.patch(`/categories/${categoryId}`, categoryData);

      dispatch(push('/'));
    }catch(error){
      if(error.response){
        dispatch(editCategoryFailure(error.response.data))
      }else{
        dispatch(editCategoryFailure({global: 'No internet connection!'}))
      }
    }
  }
};

export const deleteCategory = categoryId => {
  return async dispatch => {
    try{
      await axiosOrders.delete(`/categories/${categoryId}`)
    }catch(error){
      console.log(error);
    }
  }
};

export const removeCategoryErrors = () => {
  return async dispatch => {
    dispatch(createCategoryFailure(null));
    dispatch(editCategoryFailure(null));
  }
};

