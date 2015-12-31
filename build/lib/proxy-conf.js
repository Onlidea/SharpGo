var config = require('../../config');

module.exports = {
  ua: 'android', //android|ios|chrome|ie|android_tablet
  urlRules: [{
    pattern: '/' + config.public + '/*', //proxy the static resources to localhost
    target: 'http://localhost:7000'
  }, {
    pattern: '*',
    target: 'http://115.29.200.139:80'
  }]
};