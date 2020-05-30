import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import FormElement from "../../components/UI/FormElement/FormElement";
import {
  editUser,
  editUserFailure,
  fetchUserData,
  removeUserErrors
} from "../../store/actions/usersActions";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class EditUserPage extends Component {
  state = {
    username: '',
    password: '',
    repeatPassword: '',
  };

  async componentDidMount() {
    await this.props.fetchUserData(this.props.match.params.id);

    if(this.props.userData){
      this.setState({username: this.props.userData.username});
    }
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  onSubmitHandler = event => {
    event.preventDefault();

    if(this.state.password === this.state.repeatPassword){
      this.props.editUser(this.props.match.params.id,{...this.state});
    }else{
      this.props.addError({errors: {password: {message: 'Passwords dont match!'}}})
    }
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
                Edit user details
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
                    disabled
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="password"
                    title="New Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('password')}
                    required
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="repeatPassword"
                    title="Repeat Password"
                    type="repeatPassword"
                    value={this.state.repeatPassword}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('password')}
                    required
                  />
                </Grid>
                <Grid item xs>
                  <Button type="submit" color="primary" variant="contained">
                    Submit changes
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
  userData: state.users.userData,
  error: state.users.editError,
});

const mapDispatchToProps = dispatch => ({
  fetchUserData: userId => dispatch(fetchUserData(userId)),
  editUser: (userId, userData) => dispatch(editUser(userId, userData)),
  addError: error => dispatch(editUserFailure(error)),
  removeErrors: () => dispatch(removeUserErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);