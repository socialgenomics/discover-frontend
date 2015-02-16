/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var environment = require('config/environment');


if (environment == 'prototypes'){
  var infile = 'prototype.scss';
} else {
  var infile = 'main.scss';
}

var app = new EmberApp({
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
