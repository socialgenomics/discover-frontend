var EmberApp = require('ember-cli/lib/broccoli/ember-app');

/*
  brocolli related build conf.
 */

var environment = EmberApp.env();
var appConf = require('./config/app/' + environment + '.json');

var isProductionLikeBuild = ['development', 'production', 'staging'].indexOf(environment) > -1;

console.log(environment);

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      inputFile: 'app.scss',
      outputFile: 'main.css',
      includePaths: [
        'bower_components'
      ]
    },
    fingerprint: {
      enabled: isProductionLikeBuild,
      exclude: [],
      prepend: appConf.assetsPrependPath
    },
    sourcemaps: { enabled: !isProductionLikeBuild },
    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild },
    jscsOptions: {
      configPath: '.jscsrc',
      enabled: true,
      esnext: true,
      disableTestGenerator: process.env.CI ? true : false
    },
    babel: {
      optional: ['es7.decorators']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/materialize/dist/js/materialize.js');
  app.import('vendor/typeform.js');

  return app.toTree();
};
