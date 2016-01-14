var settings = require('./settings');

/*
  deploy related conf.
 */

module.exports = function(env) {
  console.log(settings.deploy);
  return settings.deploy;
};

