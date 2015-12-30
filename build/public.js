var config = require('../config');
var log = require('./log')('public');
var mkdirp = require('mkdirp');

function create(name, cb) {
  log.debug(name);
  mkdirp(config.public, cb);
}

module.exports = function(done) {
  create(config.public, done);
};
