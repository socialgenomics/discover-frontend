/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var environment = EmberApp.env();

var isProductionLikeBuild = ['production', 'testing'].indexOf(environment) > -1;

var prepend;
if (environment === 'production'){
  prepend = 'http://dg2kcfbxc77v1.cloudfront.net/';
}
else if (environment === 'testing'){
  prepend = 'http://testing.discover.repositive.io.s3-website-us-east-1.amazonaws.com/';
}
else {
  prepend = '';
}

console.log("\n");
console.log(environment);
console.log(prepend)
console.log("\n");

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
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
      inputFile:'main.scss',
      outputFile:'main.css',
      includePaths: ['bower_components/materialize/sass']
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

  return app.toTree();
};
