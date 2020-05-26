import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import UserMenu from "../UserMenu";
import AnonymousMenu from "../AnonymousMenu";

const NavigationBar = () => {
  const user = useSelector(state => state.users.user);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className='mr-auto' tag={NavLink} to='/'>Gallery App</NavbarBrand>
        <div>
          {user ? <UserMenu user={user}/> : <AnonymousMenu />}
        </div>
      </Navbar>
    </div>
  );
};

export default NavigationBar;