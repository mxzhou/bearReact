/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { syncHistoryWithStore } from 'react-router-redux';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import { Router, hashHistory } from 'react-router';
import getRoutes from './routes';

const client = new ApiClient();
const dest = document.getElementById('content');

const store = createStore(client);

const component = (
  <Router history={hashHistory}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
