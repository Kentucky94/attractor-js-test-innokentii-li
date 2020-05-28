import React from 'react';
import ReactDOM from 'react-dom';
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";

import App from './App';
import {loadFromLocalStorage, localStorageMiddleware} from "./store/localStorage";
import usersReducer from "./store/reducers/usersReducer";
import categoriesReducer from "./store/reducers/categoriesReducer";
import articlesReducer from "./store/reducers/articlesReducer";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';



const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  users: usersReducer,
  categories: categoriesReducer,
  articles: articlesReducer,
});

const middleware = [
  thunkMiddleware,
  localStorageMiddleware,
  routerMiddleware(history),
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));
const persistedState = loadFromLocalStorage();
export const store = createStore(rootReducer, persistedState, enhancers);

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
