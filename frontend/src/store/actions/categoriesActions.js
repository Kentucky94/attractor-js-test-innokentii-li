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