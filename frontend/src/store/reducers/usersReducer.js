import {
  FETCH_ALL_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
  user: null,
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS_SUCCESS:
      return {...state, users: action.users};
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.user};
    case LOGOUT_USER_SUCCESS:
      return {...state, user: null};
    default:
      return state;
  }
};

export default usersReducer;