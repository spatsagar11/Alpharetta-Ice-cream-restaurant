import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App.js';
import reducers from './store/reducer';
import './index.css';


const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

const AppRoot = <Provider store={store}>
   <App />
</Provider>

ReactDOM.render(AppRoot, document.getElementById('root'));
