var argv = require('yargs').argv;
var production = 'production' === process.env.NODE_ENV || argv.production;

var config = {};
config.public = './public/';

config.clientEntryPoint = './src/boot/boot.js';
config.stylEntryPoint = './src/boot/boot.styl';
config.destJSFileName = 'app.js';
config.destCSSFileName = 'app.css';

config.verbose = !!argv.verbose;
config.sourcemaps = !production && argv.sourcemaps;
config.minify = !production && argv.minify;
config.production = production;
config.livereload = !production && argv.livereload;

module.exports = config;
