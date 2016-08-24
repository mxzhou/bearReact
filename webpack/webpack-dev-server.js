var Express = require('express');
var webpack = require('webpack');
var httpProxy = require('http-proxy');

var config = require('../src/config');
var webpackConfig = require('./dev.config');
var compiler = webpack(webpackConfig);

var host = config.host || 'localhost';
var port = Number(config.port)||3000;
var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json$)/i
    })) {
    return;
  }
}

var app = new Express();
var targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
var proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
