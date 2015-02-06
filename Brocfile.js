/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  // Uncomment this & restart server to use the prototype.scss file.
  // sassOptions: {
  //     inputFile:'prototype.scss',
  // }
});



app.import('bower_components/normalize.css/normalize.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', {
    destDir: 'assets'
});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {
    destDir: 'fonts'
});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {
    destDir: 'fonts'
});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {
    destDir: 'fonts'
});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
    destDir: 'fonts'
});

app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/fontawesome/css/font-awesome.min.css');

//ADD FONTAWESOME WEB FONTS HERE
app.import('bower_components/fontawesome/fonts/fontawesome-webfont.woff', {
    destDir: 'fonts'
});

module.exports = app.toTree();
