import React from 'react';
import {Button} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const AnonymousMenu = () => {
  return (
    <div>
      <Button className='ml-2' tag={RouterNavLink} to='/register' color='primary'>Register</Button>
      <Button className='ml-2' tag={RouterNavLink} to='/login' color='primary'>Login</Button>
    </div>
  );
};

export default AnonymousMenu;