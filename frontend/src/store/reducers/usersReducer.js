import {
  FETCH_USERS_SUCCESS, LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
  user: null,
  users: [],
  registerError: null,
  loginError: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {...state, users: action.users};
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.user};
    case LOGIN_USER_FAILURE:
      return {...state, loginError: action.error};
    case REGISTER_USER_FAILURE:
      return {...state, registerError: action.error};
    case LOGOUT_USER_SUCCESS:
      return {...state, user: null};
    default:
      return state;
  }
};

export default usersReducer;