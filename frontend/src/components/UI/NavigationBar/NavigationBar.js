import React from 'react';
import {useSelector} from "react-redux";
import {Link as RouterNavLink} from "react-router-dom";

import UserMenu from "../UserMenu";
import AnonymousMenu from "../AnonymousMenu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  tbar: {
    justifyContent: 'space-between'
  },
  appbar: {
    background: 'inherit',
    fontWeight: 'bold',
  },
  tlink: {
    color: '#01579b',
    '&:hover': {
      color: '#01579b',
      textDecoration: 'none',
    }
  }
}));

const NavigationBar = () => {
  const user = useSelector(state => state.users.user);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.tbar}>
          <IconButton className={classes.tlink} edge="start" component={RouterNavLink} to='/'>
            Admin App
          </IconButton>
          <div>
            {user ? <UserMenu user={user}/> : <AnonymousMenu />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;