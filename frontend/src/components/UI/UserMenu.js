import React, {Fragment} from 'react';
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {NavLink as RouterNavLink} from "react-router-dom";

import {logoutUser} from "../../store/actions/usersActions";

const UserMenu = props => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <b>Welcome, {props.user.displayName}!</b>
      <Button className='ml-2' color="primary" tag={RouterNavLink} to='/pictures/add'>Add new picture</Button>
      <Button className='ml-2' color="success" tag={RouterNavLink} to={'/pictures/' + props.user._id}>My pictures</Button>
      <Button className='ml-2' color="danger" onClick={() => dispatch(logoutUser())}>Logout</Button>
    </Fragment>
  );
};

export default UserMenu;