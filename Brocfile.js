/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var environment = EmberApp.env();

if (environment === 'prototypes'){
  var infile = 'prototype.scss';
} else {
  var infile = 'main.scss';
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
      'bower_components/bootstrap-sass/assets/stylesheets'
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

// TODO: do we need this??
// app.import('bower_components/bootstrap/dist/js/bootstrap.js');

app.import('bower_components/ic-ajax/dist/named-amd/main.js', {
  exports: {
    'ic-ajax': [
      'default',
      'defineFixture',
      'lookupFixture',
      'raw',
      'request',
    ]
  }
});

module.exports = app.toTree()
