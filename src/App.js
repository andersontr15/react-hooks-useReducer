import React, { Component, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard.js';

const Context = React.createContext();
const { Consumer, Provider } = Context;

const initialState = {
  users: [],
  appVersion: '1.0',
  isLoading: false,
  errorMessage: '',
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'FETCHED_USERS_ERROR':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.data.errorMessage,
      };
      break;
    case 'FETCHED_USERS':
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
        users: state.users.concat(action.data.users),
      };
      break;
    case 'FETCHING_USERS':
      return {
        ...state,
        errorMessage: '',
        isLoading: true,
      };
      break;
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = {
    dispatch,
    state,
    getState: () => state,
  };
  return (
    <Provider value={store}>
      <Consumer>{store => <Dashboard {...store} />}</Consumer>
    </Provider>
  );
};

export default App;
