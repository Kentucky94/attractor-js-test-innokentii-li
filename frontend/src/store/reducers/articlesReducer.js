import {FETCH_ARTICLES_SUCCESS} from "../actions/articlesActions";

const initialState = {
  articles: [],
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type){
    case FETCH_ARTICLES_SUCCESS:
      return {...state, articles: action.articles};
    default:
      return state;
  }
};

export default articlesReducer;