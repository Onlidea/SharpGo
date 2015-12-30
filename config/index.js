var argv = require('yargs').argv;
var production = 'production' === process.env.NODE_ENV || argv.production;

var config = {};

config.public = 'public';

config.scriptEntryPoint = argv.scriptEntryPoint || 'boot/boot.js';
config.styleEntryPoint = argv.styleEntryPoint || 'boot/boot.styl';

config.scriptDestFile = argv.scriptDestFile || 'js/app.js';
config.styleDestFile = argv.styleDestFile || 'css/app.css';

config.verbose = !!argv.verbose;
config.sourcemaps = !production && argv.sourcemaps;
config.minify = !production && argv.minify;
config.production = production;
config.livereload = !production && argv.livereload;

module.exports = config;
