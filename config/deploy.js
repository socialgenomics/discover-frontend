/*jshint node: true */

var settings = require('./settings');

/*
  deploy related conf.
 */

module.exports = function(environment) {
  var config = settings.getConfig(environment);
  return config.deploy;
};
