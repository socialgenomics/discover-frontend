/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var environment = EmberApp.env();


if (environment == 'prototypes'){
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

app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/fontawesome/css/font-awesome.min.css');

//ADD FONTAWESOME WEB FONTS HERE
app.import('bower_components/fontawesome/fonts/fontawesome-webfont.woff', {
    destDir: 'fonts'
});

module.exports = app.toTree();
