import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";

import Layout from "./components/Layout/Layout";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import MainPage from "./containers/MainPage/MainPage";
import AdminPanel from "./containers/AdminPanel/AdminPanel";

import './App.css'

const ProtectedRoute = ({isAllowed, ...props}) => {
  return isAllowed ? <Route {...props} /> : <Redirect to='/' />
};

const App = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Layout>
      <ToastContainer />
      <Switch>
        <Route path='/' exact component={MainPage}/>
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <ProtectedRoute isAllowed={user && user.role === 'admin'} path='/admin' exact component={AdminPanel} />
        <Route render={() => <Redirect to='/' />}/>
      </Switch>
    </Layout>
  );
};

export default App;