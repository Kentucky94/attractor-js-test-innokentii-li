import axiosOrders from "../../axiosOrders";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const FETCH_ALL_USERS_SUCCESS = 'FETCH_ALL_USERS_SUCCESS';

export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const fetchAllUsersSuccess = users => ({type: FETCH_ALL_USERS_SUCCESS, users});



export const fetchAllUsers = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/users');

      dispatch(fetchAllUsersSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const registerUser = userData => {
  return async dispatch => {
    try {
      await axiosOrders.post('/users', userData);

      dispatch(registerUserSuccess());
      dispatch(push('/'));
    } catch (error) {
      console.log(error);
    }
  }
};

export const loginUser = userData => {
  return async dispatch => {
    try{
      const response = await axiosOrders.post('/users/sessions', userData);

      dispatch(loginUserSuccess(response.data));
      dispatch(push('/'))
    }catch(error){
      console.log(error);
    }
  }
};

export const logoutUser = () => {
  return async dispatch => {
    try{
      await axiosOrders.delete('users/sessions');

      dispatch(logoutUserSuccess());
      dispatch(push('/'));
    }catch(error){
      console.log(error);
    }
  }
};

export const editUser = (userId, userData) => {
  return async dispatch => {
    try{
      await axiosOrders.patch(`/users/${userId}`, userData);

      dispatch(push('/'))
    }catch(error){
      console.log(error)
    }
  }
};

export const deleteUser = userId => {
  return async dispatch => {
    try{
      const response = await axiosOrders.delete(`/users/${userId}`);

      toast.success(response.data.message)
    }catch(error){
      console.log(error)
    }
  }
};