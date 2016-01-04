module.exports = function(env) {
  let deployConfig
  /*
    Use ths env var `EMBER_CLI_DEPLOY_CONFIG_PATH` to direct ember-cli-deploy
    to a deploy configuration file to use.
   */
  if (process.env.EMBER_CLI_DEPLOY_CONFIG_PATH) {
    deployConfig = require(process.env.EMBER_CLI_DEPLOY_CONFIG_PATH)
  } else {
    deployConfig = require('./' + env + '.json');
  }
  /**
   * Add secrets from env variables
   */
  deployConfig.s3.accessKeyId = deployConfig.s3.accessKeyId || process.env.AWS_KEY_ID;
  deployConfig.s3.secretAccessKey = deployConfig.s3.accessKeyId || process.env.AWS_ACCESS_KEY;

  return deployConfig;
};
