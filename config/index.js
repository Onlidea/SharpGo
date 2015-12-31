var argv = require('yargs').argv;
var production = 'production' === process.env.NODE_ENV || argv.production;

var config = {};

config.public = argv.public || 'public';

config.scriptEntryPoint = argv.scriptEntryPoint || 'boot/boot.js';
config.scriptDestFile = argv.scriptDestFile || 'js/app.js';

config.styleEntryPoint = argv.styleEntryPoint || 'boot/boot.styl';
config.styleDestFile = argv.styleDestFile || 'css/app.css';

config.verbose = !!argv.verbose;
config.sourcemaps = !production && argv.sourcemaps;
config.minify = !production && argv.minify;
config.production = production;
config.livereload = !production && argv.livereload;

config.port = 7000;
config.proxyPort = 7070;

config.scriptsPerFolder = {
  '**/*.html': [{
    src: 'js/vendor.bundle.js',
    mimeType: 'text/javascript',
    copy: false
  }, {
    src: 'js/app.js',
    mimeType: 'text/javascript',
    copy: false
  }]
};

config.stylesPerFolder = {
  '**/*.html': [{
    href: 'css/vendor.bundle.css',
    mimeType: 'stylesheet',
    copy: false
  }, {
    href: 'css/app.css',
    mimeType: 'stylesheet',
    copy: false
  }]
};

module.exports = config;
