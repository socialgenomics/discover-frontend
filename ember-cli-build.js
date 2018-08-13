/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const environment = EmberApp.env();
const appConf = require('./config/environment.js');
const isProductionLikeBuild = ['development', 'production', 'staging'].indexOf(environment) > -1;

module.exports = function(defaults) {
  const ENV = appConf(environment);
  var app = new EmberApp(defaults, {
    babel: {
      sourceMaps: 'inline',
      plugins: ['transform-object-rest-spread'],
      optional: ['es7.decorators']
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    sassOptions: {
      inputFile: 'app.scss',
      outputFile: 'app.css'
    },
    outputPaths: {
      app: {
        css: {
          app: '/assets/app.css'
        },
        js: '/assets/main.js'
      },
      vendor: {
        css: '/assets/vendor.css',
        js: '/assets/vendor.js'
      }
    },
    fingerprint: {
      enabled: isProductionLikeBuild,
      exclude: [],
      prepend: ENV.assetsPrependPath
    },
    sourcemaps: { enabled: !isProductionLikeBuild },
    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild }
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

  return app.toTree();
};
