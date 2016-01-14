var YAML = require('yamljs');
/*
 Use ths env var `FRONTEND_DEPLOY_CONFIG_PATH` to direct ember-cli-deploy
 to a deploy configuration file to use.

 */

settings = YAML.load('/home/vagrant/app/config/settings/default.yml');
console.log("settings", settings);
//process.exit(1)
module.exports = settings;

