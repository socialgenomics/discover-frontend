var YAML = require('yamljs');

settings = YAML.load('/home/vagrant/app/config/settings/default.yml');
console.log("settings", settings);

module.exports = settings

