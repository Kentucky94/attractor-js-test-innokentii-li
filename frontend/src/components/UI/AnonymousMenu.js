import React, {Fragment} from 'react';
import {NavLink as RouterNavLink} from "react-router-dom";

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  button: {
    marginLeft: '10px',
    '&:hover': {
      color: 'inherit'
    },
  },
}));

const AnonymousMenu = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        component={RouterNavLink}
        to='/register'
      >
        Register
      </Button>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        component={RouterNavLink}
        to='/login'
      >
        Login
      </Button>
    </Fragment>
  );
};

export default AnonymousMenu;