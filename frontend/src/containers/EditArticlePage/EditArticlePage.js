import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import FormElement from "../../components/UI/FormElement/FormElement";
import {fetchCategories} from "../../store/actions/categoriesActions";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {createArticle, editArticle, fetchArticle} from "../../store/actions/articlesActions";

class EditArticlePage extends Component {
  state = {
    category: '',
    title: '',
    description: '',
    image: '',
  };

  async componentDidMount() {
    await this.props.fetchCategories();
    await this.props.fetchArticle(this.props.match.params.id);

    if(this.props.article){
      this.setState({
        category: this.props.article.category,
        title: this.props.article.title,
        description: this.props.article.description,
      })
    }
  }

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  fileChangeHandler = event => {
    this.setState({[event.target.name]: event.target.files[0]})
  };

  onSubmitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      const value = this.state[key];

      formData.append(key, value);
    });

    this.props.editArticle(this.props.match.params.id, formData);
  };

  render() {
    let categoryOptions = [];

    if(this.props.categories){
      categoryOptions = this.props.categories.map(cat => ({id: cat._id, title: cat.title}));
    }

    return (
      <Fragment>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Box p={2}>
              <Typography variant='h2' align='center'>
                Edit article
              </Typography>
            </Box>

            <form onSubmit={this.onSubmitHandler}>
              <Grid container direction='column' spacing={2} alignItems="center">
                <Grid item xs style={{minWidth: '300px'}}>
                  <FormElement
                    propertyName="category"
                    title="Category"
                    type="select"
                    options={categoryOptions}
                    value={this.state.category}
                    onChange={this.inputChangeHandler}
                    required
                  />
                </Grid>
                <Grid item xs style={{minWidth: '300px'}}>
                  <FormElement
                    propertyName="title"
                    title="Title"
                    type="text"
                    value={this.state.title}
                    onChange={this.inputChangeHandler}
                    required
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    type="file"
                    propertyName="image"
                    title="Image"
                    onChange={this.fileChangeHandler}
                  />
                </Grid>
                <Grid item xs style={{width: '70vw', minWidth: '300px'}} >
                  <FormElement
                    propertyName="description"
                    title="Description"
                    type="text"
                    value={this.state.description}
                    onChange={this.inputChangeHandler}
                    multiline
                    rows={8}
                    rowsMax={16}
                    fullWidth
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
  article: state.articles.article,
  categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchArticle: articleId => dispatch(fetchArticle(articleId)),
  editArticle: (articleId, articleData) => dispatch(editArticle(articleId, articleData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage);