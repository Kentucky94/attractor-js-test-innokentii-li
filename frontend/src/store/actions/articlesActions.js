import axiosOrders from "../../axiosOrders";
import {push} from 'connected-react-router';


export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';

export const fetchArticlesSuccess = articles => ({type: FETCH_ARTICLES_SUCCESS, articles});

export const fetchArticles = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/articles');

      dispatch(fetchArticlesSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const postArticle = articleData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/articles', articleData);

      dispatch(push('/'))
    }catch(error){
      console.log(error);
    }
  }
};

export const editArticle = (articleId, articleData) => {
  return async dispatch => {
    try{
      await axiosOrders.patch(`/articles/${articleId}`, articleData);
    }catch(error){
      console.log(error);
    }
  }
};

export const deleteArticle = articleId => {
  return async dispatch => {
    try{
      await axiosOrders.delete(`/articles/${articleId}`);
    }catch(error){
      console.log(error);
    }
  }
};