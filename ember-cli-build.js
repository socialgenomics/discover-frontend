var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var settings = require('./config/settings');

/*
  brocolli related build conf.
 */

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    outputPaths: {
      app: {
        css: {
          'app': '/assets/app.css'
        },
        js: '/assets/main.js'
      },
      vendor: {
        css: '/assets/vendor.css',
        js: '/assets/vendor.js'
      }
    },
    sassOptions: {
      inputFile: 'app.scss',
      outputFile: 'app.css',
      includePaths: [
        'bower_components/materialize/sass',
        'bower_components'
      ]
    },
    fingerprint: settings.fingerprint,
    sourcemaps: settings.sourcemaps,
    minifyCSS: settings.minifyCSS,
    minifyJS: settings.minifyJS,
    jscsOptions: {
      configPath: '.jscsrc',
      enabled: true,
      esnext: true,
      disableTestGenerator: false
    },
    sassOptions: {
      inputFile: 'app.scss',
      outputFile: 'main.css',
      includePaths: [
        'bower_components/materialize/sass',
        'bower_components'
      ]
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

  app.import('bower_components/JavaScript-MD5/js/md5.js');

  return app.toTree();
};
