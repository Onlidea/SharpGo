var config = require('../config');
var log = require('./log')('clean');
var del = require('del');

module.exports = function(done) {
  // [config.public, './node_modules']
  del([config.public], function(err, paths) {
    paths.forEach(function(path) {
      log.info(path);
    });

    done(err);
  });
};
