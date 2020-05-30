import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";

import Layout from "./components/Layout/Layout";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import CreateCategoryPage from "./containers/CreateCategoryPage/CreateCategoryPage";
import CreateArticlePage from "./containers/CreateArticlePage/CreateArticlePage";
import EditCategoryPage from "./containers/EditCategoryPage/EditCategoryPage";
import EditArticlePage from "./containers/EditArticlePage/EditArticlePage";

import './App.css'

const ProtectedRoute = ({isAllowed, ...props}) => {
  return isAllowed ? <Route {...props} /> : <Redirect to='/error' />
};

const App = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Layout>
      <ToastContainer />
      <Switch>
        <ProtectedRoute isAllowed={user && user.role === 'admin'} path='/' exact component={AdminPanel} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <ProtectedRoute isAllowed={user && user.role === 'admin'} path='/categories/create' exact component={CreateCategoryPage} />
        <ProtectedRoute isAllowed={user && user.role === 'admin'} path='/categories/edit/:id' exact component={EditCategoryPage} />
        <ProtectedRoute isAllowed={user && user.role === 'admin'} path='/articles/create' exact component={CreateArticlePage} />
        <ProtectedRoute isAllowed={user && user.role === 'admin'} path='/articles/edit/:id' exact component={EditArticlePage} />
        <Route path='/error' exact component={ErrorPage}/>
      </Switch>
    </Layout>
  );
};

export default App;