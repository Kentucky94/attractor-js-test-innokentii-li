import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import FormElement from "../../components/UI/FormElement/FormElement";
import {registerUser, removeUserErrors} from "../../store/actions/usersActions";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Register extends Component {
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

    this.props.registerUser({...this.state});
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
                Registration
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
                    error={this.getFieldError('username')}
                    required
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="password"
                    title="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('password')}
                    required
                  />
                </Grid>
                <Grid item xs>
                  <Button type="submit" color="primary" variant="contained">
                    Register user
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
  error: state.users.registerError,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
  removeErrors: () => dispatch(removeUserErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);