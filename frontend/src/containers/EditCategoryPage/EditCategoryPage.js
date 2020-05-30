import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import FormElement from "../../components/UI/FormElement/FormElement";
import {editCategory, fetchCategory, removeCategoryErrors} from "../../store/actions/categoriesActions";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class EditCategoryPage extends Component {
  state = {
    title: '',
  };

  async componentDidMount() {
    await this.props.fetchCategory(this.props.match.params.id);

    if(this.props.category){
      this.setState({title: this.props.category.title});
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

    this.props.editCategory(this.props.match.params.id, {...this.state});
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
                Edit category
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
  category: state.categories.category,
  error: state.categories.editError,
});

const mapDispatchToProps = dispatch => ({
  fetchCategory: categoryId => dispatch(fetchCategory(categoryId)),
  editCategory: (categoryId, categoryData) => dispatch(editCategory(categoryId, categoryData)),
  removeErrors: () => dispatch(removeCategoryErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryPage);