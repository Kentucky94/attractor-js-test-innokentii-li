import axiosOrders from "../../axiosOrders";

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});

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

export const createCategory = categoryData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/categories', categoryData);
    }catch(error){
      console.log(error);
    }
  }
};

export const editCategory = (categoryId, categoryData) => {
  return async dispatch => {
    try{
      await axiosOrders.patch(`/categories/${categoryId}`, categoryData);
    }catch(error){
      console.log(error);
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

