import React, {Component} from 'react';
import MasterTable from "../../components/MasterTable/MasterTable";
import {fetchUsers} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {fetchArticles} from "../../store/actions/articlesActions";

class AdminPanel extends Component {
  async componentDidMount() {
    await this.props.fetchUsers();
    await this.props.fetchCategories();
    await this.props.fetchArticles();
  }

  render() {
    // const userRows = [
    //   {_id: 1, username: 'user1', role: 'user'},
    //   {_id: 2, username: 'user2', role: 'user'},
    //   {_id: 3, username: 'user3', role: 'user'},
    //   {_id: 4, username: 'user4', role: 'user'},
    //   {_id: 5, username: 'user5', role: 'admin'},
    //   {_id: 6, username: 'user1', role: 'user'},
    //   {_id: 7, username: 'user2', role: 'user'},
    //   {_id: 8, username: 'user3', role: 'user'},
    //   {_id: 9, username: 'user4', role: 'user'},
    //   {_id: 10, username: 'user5', role: 'admin'},
    // ];

    let usersRows = [];
    let categoriesRows = [];
    let articlesRows = [];

    if(this.props.users){
      usersRows = this.props.users.map(user => {
        return {id: user._id, name: user.username, prop1: user.role,}
      });
    }

    if(this.props.categories){
      categoriesRows = this.props.categories.map(category => {
        return {id: category._id, name: category.title,}
      });
    }

    if(this.props.articles){
      articlesRows = this.props.articles.map(article => {
        return {id: article._id, name: article.title, prop1: article.user.username}
      });
    }

    const usersHeadCells = [
      { id: 'name', alignRight: false, label: 'UserName'},
      { id: 'prop1', alignRight: true, label: 'Role'},
      { id: 'dummy1', alignRight: true, },
      { id: 'addCell', alignRight: true, isAddButton: true, path: '/users/add', },
    ];

    const categoriesHeadCells = [
      { id: 'name', alignRight: false, label: 'Title'},
      { id: 'dummy1', alignRight: true, },
      { id: 'addCell', alignRight: true, isAddButton: true, path: '/users/add', },
    ];

    const articlesHeadCells = [
      { id: 'name', alignRight: false, label: 'Title'},
      { id: 'prop1', alignRight: true, label: 'Author'},
      { id: 'dummy1', alignRight: true, },
      { id: 'addCell', alignRight: true, isAddButton: true, path: '/users/add', },
    ];

    return (
      <div>
        <MasterTable
          rows={usersRows}
          headCells={usersHeadCells}
        />

        <MasterTable
          rows={categoriesRows}
          headCells={categoriesHeadCells}
        />

        <MasterTable
          rows={articlesRows}
          headCells={articlesHeadCells}
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