/* jshint node: true */
var _ = require('underscore');
var deploySettings = require('./deploy');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'repositive',
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
          "datasets.search" : "/api/datasets/search",
          "invites": "/api/invites",
          "users.profiles": "/api/users/profiles",
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
      includePaths: [
        'bower_components/materialize/sass',
        'bower_components'
      ]
    },
    'simple-auth' : {
      store: 'simple-auth-session-store:local-storage',
      crossOriginWhitelist: ['http://*.repositive.io'],
      authorizer: 'authorizer:repositive',
      routeAfterAuthentication: 'root',
      authenticationRoute: 'users.login',
      signupRoute: 'users.signup',
      logoutRoute: 'users.logout',
    },
    'simple-auth-cookie-store' : {
      cookieName: 'repositive.io'
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
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'font-src': "'self' data: fonts.gstatic.com",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
      'script-src': "'self' 'unsafe-inline' http://api.calq.io http://www.google-analytics.com/analytics.js", // Allow scripts from api.calq.io
      'connect-src': "'self' 'unsafe-inline' http://api.calq.io", // Allow data (ajax/websocket) from api.calq.io
      'img-src': "'self' data: http://www.google-analytics.com",
      'media-src': "'self'",
    },
    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        config: {
          id: 'UA-54495053-2'
        },
        environments: ['production']
      },
      {
        name: 'Calq',
        config: {
          id: 'ca78eed5d34a041ab5cf164295cf2c25'
        },
        environments: ['production']
      },
    ]
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
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
    ENV.locationType = 'none';
    ENV.torii.providers['google-oauth2'].redirectUri = 'http://testing.discover.repositive.io'
    ENV.torii.providers['linked-in-oauth2'].redirectUri = 'http://testing.discover.repositive.io'
  }

  if (environment === 'production') {
    ENV.torii.providers['google-oauth2'].redirectUri = 'http://discover.repositive.io'
    ENV.torii.providers['linked-in-oauth2'].redirectUri = 'http://discover.repositive.io'
  }

  return ENV;
};
