dotenv = require('dotenv').load();
/*
  deploy related conf.
 */

module.exports = function(env) {
  var deployConfig;
  /*
    Use ths env var `FRONTEND_DEPLOY_CONFIG_PATH` to direct ember-cli-deploy
    to a deploy configuration file to use.
   */
  if (process.env.FRONTEND_DEPLOY_CONFIG_PATH) {
    deployConfig = require(process.env.FRONTEND_DEPLOY_CONFIG_PATH);
  } else {
    try {
      deployConfig = require('./servers/' + env + '.json');
    } catch (e) {
      console.warn('Error, could not load conf file for `' + env +
                   '` using default local-development.json file.');
      deployConfig = require('./servers/local-development.json');
    }
  }
  /**
   * Add secrets from env variables.
   */
  if (deployConfig.s3 === undefined) {
    deployConfig.s3 = {};
  }
  deployConfig.s3.accessKeyId = process.env.AWS_KEY;
  deployConfig.s3.secretAccessKey = process.env.AWS_SECRET;

  if (process.env.AWS_KEY === undefined || process.env.AWS_SECRET === undefined) {
    console.warn('no AWS creds found in .env file. These are only needed for deployment.')
  }

  return deployConfig;
};
