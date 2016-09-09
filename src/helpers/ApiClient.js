import superagent from 'superagent';
import config from '../config';
import {loading} from '../redux/modules/loading'
const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api/api/kugou_live' + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
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
            Object.assign(data,{"kgUid":791949749,"token":"2bb14f008c7ccf7aaeec82c8b81b167e358d794fc671fade2bb3fc78f5e38f32"});        
            request.send(data);
          }

          request.end((err, { body } = {}) => {
            if(err){
              reject(body || err)
            }else{
              //console.log(body)
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
