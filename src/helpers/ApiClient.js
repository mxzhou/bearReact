import React, { Component,PropTypes } from 'react';
import superagent from 'superagent';
import config from '../config';
import createStore from '../redux/create';
const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api/kugou_live' + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    const store = createStore();
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) =>
      {
        return new Promise((resolve, reject) => {

          const request = superagent[method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          if (__SERVER__ && req.get('cookie')) {
            request.set('cookie', req.get('cookie'));
          }

          if (data) {
            const userStorage = JSON.parse(sessionStorage.getItem('userStorage'));
            Object.assign(data,userStorage);
            request.send(data);
          }
          $("#Loading").show();
          request.end((err, { body } = {}) => {
            $("#Toast").hide();
            $("#Loading").hide();
            if(err){
              location.href = "#/notFound"
              reject(body || err)
            }else{
              // 验证信息
              if(body.errorCode != 0){
                $("#ToastMsg").text(body.errorMessage)
                $("#Toast").show();
                setTimeout(()=>{
                  $("#Toast").hide();
                },2000)
                reject(body || err)
                return;
              }
              resolve(body)
            }
          });
        })
      });
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
