import {
  EDIT_USER_FAILURE, FETCH_USERDATA_SUCCESS,
  FETCH_USERS_SUCCESS, LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS, REGISTER_USER_FAILURE
} from "../actions/usersActions";

const initialState = {
  user: null,
  users: [],
  userData: {},
  registerError: null,
  loginError: null,
  editError: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {...state, users: action.users};
    case FETCH_USERDATA_SUCCESS:
      return {...state, userData: action.userData};
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.user};
    case LOGIN_USER_FAILURE:
      return {...state, loginError: action.error};
    case REGISTER_USER_FAILURE:
      return {...state, registerError: action.error};
    case LOGOUT_USER_SUCCESS:
      return {...state, user: null};
    case EDIT_USER_FAILURE:
      return {...state, editError: action.error};
    default:
      return state;
  }
};

export default usersReducer;