import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store = { createStore(reducers, {}, applyMiddleware(reduxThunk)) }>
    <App />
  </Provider>, 
  document.querySelector("#root")
);
serviceWorker.unregister();
