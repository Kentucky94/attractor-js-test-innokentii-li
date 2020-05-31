import React, {Fragment} from 'react';
import {useDispatch} from "react-redux";

import {logoutUser} from "../../store/actions/usersActions";

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  user: {
    color: '#01579b',
    marginRight: '20px',
    fontWeight: 'bold',
  }
});

const UserMenu = props => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Fragment>
      <Typography className={classes.user} variant='button'>
        {props.user.username}
      </Typography>

      <Button variant='contained' color="secondary" onClick={() => dispatch(logoutUser())}>Logout</Button>
    </Fragment>
  );
};

export default UserMenu;