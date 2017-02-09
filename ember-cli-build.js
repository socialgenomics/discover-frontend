var path = require('path');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var jsStringEscape = require('js-string-escape');

var environment = EmberApp.env();
var appConf = require('./config/app/' + environment + '.json');

var isProductionLikeBuild = ['development', 'production', 'staging'].indexOf(environment) > -1;

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      inputFile: 'app.scss',
      outputFile: 'app.css',
      includePaths: [
        'bower_components'
      ]
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
      sourceMaps: 'inline',
      optional: ['es7.decorators']
    },
    // Disable JSHint
    'ember-cli-mocha': {
      useLintTree: false
    },
    // Use ESLint
    // eslint: {
    //   testGenerator: eslintTestGenerator
    // },
    "parser": "babel-eslint"
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

  app.import('bower_components/crypto-js/crypto-js.js');
  app.import('bower_components/materialize/dist/js/materialize.js');
  app.import('bower_components/urijs/src/URI.js');

  return app.toTree();
};


// ESLint Mocha test generator
// TODO: Inprocess of changing this for Mocha setup
// function eslintTestGenerator(relativePath, errors) {
//   var pass = !errors || errors.length === 0;
//   return "import { expect } from 'chai';\n"+
//     "import { describeModule, it } from 'ember-mocha';\n"+
//     "describeModule('ESLint - " + path.dirname(relativePath) + "');\n"+
//     "it('" + relativePath + " should pass ESLint', function(expect) {\n" +
//     "  expect(" + pass + ", '" + relativePath + " should pass ESLint." +
//     jsStringEscape("\n" + render(errors)) + "').to.be.ok;\n" +
//   "});\n";
// }
// //     "module('ESLint - " + path.dirname(relativePath) + "');\n" +
// //     "it('" + relativePath + " should pass ESLint', function(assert) {\n" +
// //     "  assert.ok(" + pass + ", '" + relativePath + " should pass ESLint." +
//
//
//
//
//
// function render(errors) {
//   if (!errors) { return ''; }
//   return errors.map(function(error) {
//     return error.line + ':' + error.column + ' ' +
//     ' - ' + error.message + ' (' + error.ruleId +')';
//   }).join('\n');
// }
