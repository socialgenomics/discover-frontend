/* jshint node: true */
var _ = require('underscore');


module.exports = function(environment) {
  var env = environment;
  var APIBaseURL, APIRoutes;
  if (env === 'production'){
    APIBaseURL = 'http://api.repositive.io'
  }
  else {
    APIBaseURL = '/api'
  }
  APIRoutes = _.each({
    "users.login" : "/users/login",           
    "users.signup" : "/users",           
  }, function(path, key, obj){
    obj[key] =  APIBaseURL + path;
  });
  var redirectUri = (function(){ 
    if (env === 'development') { return 'http://localhost:4200'; }
    else { return 'http://platform.repositive.io'; }
  }());
  var ENV = {
    modulePrefix: 'repositive.io',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    APIBaseURL: APIBaseURL,
    // mapping of backend routes
    APIRoutes: APIRoutes,  

    sassOptions: {
      inputFile:'main.scss',
      outputFile:'main.css',
      includePaths: ['bower_components/materialize/sass']
    },
    'simple-auth' : {
      authorizer: 'authorizer:repositive',
      routeAfterAuthentication: 'users.profile',
      authenticationRoute: 'users.login',
      signupRoute: 'users.signup',
    },
    'simple-auth-cookie-store' : {
      cookieName: 'repositvie.io'
    },
    torii: {
      providers: {
        'google-oauth2': {
          apiKey:      '677526813069-6tmd1flqovp5miud67phqlks49bqdo8i.apps.googleusercontent.com',
          redirectUri: redirectUri
        },
        'linked-in-oauth2': {
          apiKey:      '75fsbvpfgi1667',
          redirectUri: redirectUri
        }
      }
    }
  };

  if (environment === 'development') {
   // ENV.APP.LOG_RESOLVER = true;
   // ENV.APP.LOG_ACTIVE_GENERATION = true;
   // ENV.APP.LOG_TRANSITIONS = true;
   // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
   // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
  }

  return ENV;
};
