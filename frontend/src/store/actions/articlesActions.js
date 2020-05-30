import {push} from 'connected-react-router';

import axiosOrders from "../../axiosOrders";

export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';

export const fetchArticlesSuccess = articles => ({type: FETCH_ARTICLES_SUCCESS, articles});
export const fetchArticleSuccess = article => ({type: FETCH_ARTICLE_SUCCESS, article});

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

export const fetchArticle = articleId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get(`/articles/${articleId}`);

      dispatch(fetchArticleSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const createArticle = articleData => {
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

      dispatch(push('/'))
    }catch(error){
      console.log(error);
    }
  }
};

export const deleteArticle = articleId => {
  return async dispatch => {
    try{
      await axiosOrders.delete(`/articles/${articleId}`);

      dispatch(fetchArticles());
    }catch(error){
      console.log(error);
    }
  }
};