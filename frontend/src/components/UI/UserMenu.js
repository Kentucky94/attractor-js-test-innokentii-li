import React, {Fragment} from 'react';
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {NavLink as RouterNavLink} from "react-router-dom";

import {logoutUser} from "../../store/actions/usersActions";

const UserMenu = props => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <b>Welcome, {props.user.username}!</b>

      {props.user.role === 'admin' ?
        <Button
          className='ml-2'
          color="success"
          tag={RouterNavLink}
          to='/admin'
        >
          Admin panel
        </Button> : null
      }

      <Button className='ml-2' color="danger" onClick={() => dispatch(logoutUser())}>Logout</Button>
    </Fragment>
  );
};

export default UserMenu;