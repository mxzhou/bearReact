/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
// requestAnimation 兼容
(function(window) {
  "use strict";
  var lastTime = 0;
  window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame||
    window.oRequestAnimationFrame||
    window.msRequestAnimationFrame||
    function(callback) {
      var currTime = Date.now(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);

      lastTime = currTime + timeToCall;

      return id;
    };
  window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.cancelRequestAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.webkitCancelRequestAnimationFrame
    || window.mozCancelRequestAnimationFrame
    || window.oCancelRequestAnimationFrame
    || window.msCancelRequestAnimationFrame
    || clearTimeout;
})(window);
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { syncHistoryWithStore } from 'react-router-redux';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import { Router, hashHistory } from 'react-router';
import getRoutes from './routes';
import jquery from 'jquery'

const client = new ApiClient();
const dest = document.getElementById('content');

const store = createStore(client);
global.addressObject={}
const component = (
  <Router history={hashHistory}>
    {getRoutes(store)}
  </Router>
);
// 默认hash
if(location.hash == ''){
  location.href = location+'#/home'
}
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
