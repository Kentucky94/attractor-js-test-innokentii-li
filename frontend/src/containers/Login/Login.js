import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import FormElement from "../../components/UI/FormElement/FormElement";
import {loginUser, removeUserErrors} from "../../store/actions/usersActions";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  componentWillUnmount() {
    this.props.removeErrors();
  }

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  onSubmitHandler = event => {
    event.preventDefault();

    this.props.loginUser({...this.state});
  };

  getFieldError = fieldName => {
    try{
      return this.props.error.errors[fieldName].message;
    }catch(error){
      return undefined;
    }
  };

  render() {
    return (
      <Fragment>
        <Grid container justify="center">
          <Grid item xs={12} md={6} lg={4}>
            <Box p={2}>
              <Typography variant='h2' align='center'>
                Login
              </Typography>
            </Box>

            <form onSubmit={this.onSubmitHandler}>
              <Grid container direction='column' spacing={2} alignItems="center">
                <Grid item xs>
                  <FormElement
                    propertyName="username"
                    title="Username"
                    type="text"
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    required
                    error={this.getFieldError('username')}
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="password"
                    title="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    required
                    error={this.getFieldError('password')}
                  />
                </Grid>
                <Grid item xs>
                  <Button type="submit" color="primary" variant="contained">
                    Login user
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  error: state.users.loginError,
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData)),
  removeErrors: () => dispatch(removeUserErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);