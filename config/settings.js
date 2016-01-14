/*jshint node: true */
/* globals __dirname: false */

var YAML = require('yamljs');

const CONFIG_PATH = __dirname + '/settings';

module.exports = {
  /**
   * Read configuration depending on environment.
   */
  getConfig: function (environment) {
    var config, configFile;
    try {
      configFile = CONFIG_PATH + '/' + environment + '.yml';
      console.log("Reading config:", configFile);
      config = YAML.load(configFile);

    } catch (e) {
      console.log("Could not read ", environment, "YAML config");
      process.exit(1);
    }
    return config;
  }

};
