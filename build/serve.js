var config = require('../config');
var connect = require('connect');
var rewriteModule = require('http-rewrite-middleware');
var gutil = require('gulp-util');
var open = require('open');

var proxy = require('./lib/proxy');

var mockDataConfig = require('../config/mock');

module.exports = function function_name() {

  var port = config.port;
  var proxyPort = config.proxyPort;
  var app = connect();

  app.use(rewriteModule.getMiddleware([{
    from: '^/' + config.public + '/(.*)$',
    to: '/$1'
  }]));
  app.use(connect.static(config.public));

  app.listen(port);
  gutil.log(gutil.colors.green('Server started on ' + port + ' port'));

  proxy.startProxy({
    port: proxyPort,
    routeConfig: mockDataConfig
  });
  gutil.log(gutil.colors.green('Proxy Server started on ' + proxyPort + ' port'));

  // chrome canary
  open('http://localhost:' + proxyPort + '/' + config.public + '/index.html', 'chrome');
};
