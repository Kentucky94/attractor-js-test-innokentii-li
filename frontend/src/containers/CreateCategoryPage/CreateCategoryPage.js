import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import FormElement from "../../components/UI/FormElement/FormElement";
import {createCategory, removeCategoryErrors} from "../../store/actions/categoriesActions";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class CreateCategoryPage extends Component {
  state = {
    title: '',
  };

  componentWillUnmount() {
    this.props.removeErrors();
  }

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  onSubmitHandler = event => {
    event.preventDefault();

    this.props.createCategory({...this.state});
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
          <Grid item xs={12}>
            <Box p={2}>
              <Typography variant='h2' align='center'>
                Create new category
              </Typography>
            </Box>

            <form onSubmit={this.onSubmitHandler}>
              <Grid container direction='column' spacing={2} alignItems="center">
                <Grid item xs>
                  <FormElement
                    propertyName="title"
                    title="Category title"
                    type="text"
                    value={this.state.title}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('title')}
                    required
                  />
                </Grid>
                <Grid item xs>
                  <Button type="submit" color="primary" variant="contained">
                    Create
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
  error: state.categories.createError,
});

const mapDispatchToProps = dispatch => ({
  createCategory: categoryData => dispatch(createCategory(categoryData)),
  removeErrors: () => dispatch(removeCategoryErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryPage);