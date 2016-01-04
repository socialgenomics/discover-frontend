/*
  deploy related conf.
 */

module.exports = function(env) {
  var deployConfig
  console.log(env)
  /*
    Use ths env var `EMBER_CLI_DEPLOY_CONFIG_PATH` to direct ember-cli-deploy
    to a deploy configuration file to use.
   */
  if (process.env.FRONTEND_DEPLOY_CONFIG_PATH) {
    deployConfig = require(process.env.FRONTEND_DEPLOY_CONFIG_PATH)
  } else {
    try {
      deployConfig = require('./servers/' + env + '.json');
    } catch (e) {
      console.log(e);
      deployConfig = require('./servers/development.json');
    }
  }
  /**
   * Add secrets from env variables.
   */
  deployConfig.s3.accessKeyId = deployConfig.s3.accessKeyId || process.env.AWS_KEY_ID;
  deployConfig.s3.secretAccessKey = deployConfig.s3.accessKeyId || process.env.AWS_ACCESS_KEY;

  return deployConfig;
};
