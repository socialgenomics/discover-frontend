/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var environment = EmberApp.env();

if (environment === 'prototypes'){
  var infile = 'prototype.scss';
} else {
  var infile = 'main.scss';
}

console.log('brocfile', environment)
var isProductionLikeBuild = ['production', 'testing'].indexOf(environment) > -1;

var prepend;
if (isProductionLikeBuild){
  prepend = 'http://d3duxukexohr0v.cloudfront.net/';
}
else {
  prepend = '';
}

var app = new EmberApp({
  outputPaths: {
    app: {
      css: {
        'main': '/assets/main.css'
      },
      js: '/assets/main.js'
    },
    vendor: {
      css: '/assets/vendor.css',
      js: '/assets/vendor.js'
    }
  },
  sassOptions: {
    inputFile:infile,
    outputFile:'main.css',
    includePaths: [
      //'bower_components/bootstrap-sass/assets/stylesheets'
    ]
  },
  fingerprint: {
    enabled: isProductionLikeBuild,
    exclude: [],
    prepend: prepend,
  },
  sourcemaps: {
    enabled: !isProductionLikeBuild,
  },
  minifyCSS: { enabled: isProductionLikeBuild },
  minifyJS: { enabled: isProductionLikeBuild },
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

app.import('bower_components/materialize/sass/materialize.scss');
//app.import('bower_components/materialize/dist/js/materialize.js');
module.exports = app.toTree();
