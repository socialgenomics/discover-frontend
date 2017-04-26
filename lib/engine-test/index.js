/*jshint node:true*/
var EngineAddon = require('ember-engines/lib/engine-addon');
module.exports = EngineAddon.extend({
  name: 'engine-test',

  isDevelopingAddon: function() {
    return true;
  }
});
