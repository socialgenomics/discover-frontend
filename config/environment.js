/* jshint node: true */
var _ = require('underscore');
var deploySettings = require('./deploy');

module.exports = function(environment) {

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

    APIBaseURL: (function(){
      if (environment in deploySettings){
        return deploySettings[environment].apiBaseURL;
      }
      else {
        return '';
      }
    }()),

    // mapping of backend routes
    APIRoutes : (function(){
      var mapping =
      {
          "users.login" : "/api/users/login",
          "users.logout" : "/api/users/logout",
          "users.signup" : "/api/users",
      };
      _.each(mapping,
        function(path, key, obj){
          if (environment in deploySettings){
            obj[key] =  deploySettings[environment].apiBaseURL + path;
          }
        }
      );
      return mapping;
    }()),

    sassOptions: {
      inputFile:'main.scss',
      outputFile:'main.css',
      includePaths: ['bower_components/materialize/sass']
    },
    'simple-auth' : {
      crossOriginWhitelist: ['http://*.repositive.io'],
      authorizer: 'authorizer:repositive',
      routeAfterAuthentication: 'users.profile',
      authenticationRoute: 'users.login',
      signupRoute: 'users.signup',
      logoutRoute: 'users.logout',
    },
    'simple-auth-cookie-store' : {
      cookieName: 'repositvie.io'
    },
    torii: {
      providers: {
        'google-oauth2': {
          apiKey:      '677526813069-6tmd1flqovp5miud67phqlks49bqdo8i.apps.googleusercontent.com',
          redirectUri: 'http://localhost:4200'
        },
        'linked-in-oauth2': {
          apiKey:      '75fsbvpfgi1667',
          redirectUri: 'http://localhost:4200'
        }
      }
    }
  };

  if (environment === 'development') {
   // ENV.APP.LOG_RESOLVER = true;
   // ENV.APP.LOG_ACTIVE_GENERATION = true;
   ENV.APP.LOG_TRANSITIONS = true;
   // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
   ENV.APP.LOG_VIEW_LOOKUPS = true;
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

  if (environment === 'testing') {
    ENV.torii.providers['google-oauth2'].redirectUri = 'http://platform.repositive.io'
    ENV.torii.providers['linked-in-oauth2'].redirectUri = 'http://platform.repositive.io'
  }

  if (environment === 'production') {
    ENV.torii.providers['google-oauth2'].redirectUri = 'http://platform.repositive.io'
    ENV.torii.providers['linked-in-oauth2'].redirectUri = 'http://platform.repositive.io'
  }

  return ENV;
};
