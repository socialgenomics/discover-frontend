/*
  deploy related conf.
 */

module.exports = function(env) {
  var deployConfig
  /*
    Use ths env var `FRONTEND_DEPLOY_CONFIG_PATH` to direct ember-cli-deploy
    to a deploy configuration file to use.
   */
  if (process.env.FRONTEND_DEPLOY_CONFIG_PATH) {
    deployConfig = require(process.env.FRONTEND_DEPLOY_CONFIG_PATH)
  } else {
    try {
      deployConfig = require('./servers/' + env + '.json');
    } catch (e) {
      console.warn('Error, could not load conf file for `' + env +
                   '` using default development.json file.');
      deployConfig = require('./servers/development.json');
    }
  }
  /**
   * Add secrets from env variables.
   */
  try {
    deployConfig.s3.accessKeyId = process.env.AWS_KEY;
    deployConfig.s3.secretAccessKey = process.env.AWS_SECRET;
  } catch (e) {
    console.info('no AWS creds specified in .env file, this is only needed if you are deploying.')
  }

  return deployConfig;
};
