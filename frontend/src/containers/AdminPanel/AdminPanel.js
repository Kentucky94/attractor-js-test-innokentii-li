import React, {Component} from 'react';
import {connect} from "react-redux";

import MasterTable from "../../components/MasterTable/MasterTable";
import {fetchUsers} from "../../store/actions/usersActions";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {fetchArticles} from "../../store/actions/articlesActions";

class AdminPanel extends Component {
  async componentDidMount() {
    await this.props.fetchUsers();
    await this.props.fetchCategories();
    await this.props.fetchArticles();
  }

  render() {
    let usersRows = [];
    let categoriesRows = [];
    let articlesRows = [];

    if(this.props.users){
      usersRows = this.props.users.map(user => {
        const modalTitle = user.username;
        const modalContent = 'Role: ' + user.role;

        return {
          id: user._id,
          name: user.username,
          propNum1: user.role,
          modalTitle,
          modalContent,
        }
      });
    }

    if(this.props.categories){
      categoriesRows = this.props.categories.map(category => {
        const modalTitle = category.title;

        return {
          id: category._id,
          name: category.title,
          propNum1: '    ',
          modalTitle,
        }
      });
    }

    if(this.props.articles){
      articlesRows = this.props.articles.map(article => {
        const modalTitle = article.title;
        const modalContent = article.description;
        const modalImage = `http://localhost:8080/uploads/${article.image}`;

        return {
          id: article._id,
          name: article.title,
          propNum1: article.user.username,
          propNum2: article.category.title,
          modalTitle,
          modalImage,
          modalContent,
        }
      });
    }

    const usersHeadCells = [
      { id: 'name', alignRight: false, label: 'UserName', },
      { id: 'propNum1', alignRight: true, label: 'Role', },
      { id: 'dummy1', alignRight: true, },
      { id: 'dummy2', alignRight: true, },
    ];

    const categoriesHeadCells = [
      { id: 'name', alignRight: false, label: 'Title', },
      { id: 'propNum1', alignRight: true, label: '', },
      { id: 'dummy1', alignRight: true, },
      { id: 'addCell', alignRight: true, isAddButton: true, path: '/users/add', },
    ];

    const articlesHeadCells = [
      { id: 'name', alignRight: false, label: 'Title', },
      { id: 'propNum1', alignRight: true, label: 'Author', },
      { id: 'propNum2', alignRight: true, label: 'Category', },
      { id: 'dummy1', alignRight: true, },
      { id: 'addCell', alignRight: true, isAddButton: true, path: '/users/add', },
    ];

    return (
      <div>
        <MasterTable
          rows={usersRows}
          headCells={usersHeadCells}
          tableName='users'
        />

        <MasterTable
          rows={categoriesRows}
          headCells={categoriesHeadCells}
          tableName='categories'
        />

        <MasterTable
          rows={articlesRows}
          headCells={articlesHeadCells}
          tableName='articles'
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  categories: state.categories.categories,
  articles: state.articles.articles,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchArticles: () => dispatch(fetchArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);