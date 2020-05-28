import React, {Fragment} from 'react';
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";

import {logoutUser} from "../../store/actions/usersActions";

const UserMenu = props => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <b>Welcome, {props.user.username}!</b>

      <Button className='ml-2' color="danger" onClick={() => dispatch(logoutUser())}>Logout</Button>
    </Fragment>
  );
};

export default UserMenu;