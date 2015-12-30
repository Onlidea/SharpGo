var util = require('gulp-util');
var config = require('../config');

var colors = {
  debug: 'blue',
  warn: 'yellow',
  info: 'green',
  error: 'red'
};

module.exports = function(task) {

  function write(type, msg) {
    var color = colors[type];
    util.log(util.colors.cyan(task), util.colors[color](type), msg);
  }

  return {
    debug: function(msg) {
      if (config.verbose && !config.production) {
        write('debug', msg);
      }
    },

    warn: function(msg) {
      write('warn', msg);
    },

    info: function(msg) {
      write('info', msg);
    },

    error: function(msg) {
      write('error', msg);
    }
  };
};
