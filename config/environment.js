/*jshint node: true */

var _ = require('underscore');
var settings = require('./settings');

/*
 app related conf.
 */


module.exports = function (environment) {
  var config = settings.getConfig(environment),
    ENV = {
      modulePrefix: 'repositive',
      environment: config.build.environment,
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

      /*
       The base URL path of the API.
       */
      APIBaseURL: config.apiBaseURL,

      /*
       Mapping of route names to API paths, needed for non ember-data calls to
       the API.
       */
      APIRoutes: (function () {
        var mapping = {
          'users.login': '/api/users/login',
          'users.logout': '/api/users/logout',
          'users.signup': '/api/users',
          'datasets.search': '/api/datasets/search',
          'invites': '/api/invites',
          'users.profiles': '/api/users/profiles',
          'reset-password': '/api/users/password-reset'
        };
        _.each(mapping,
          function (path, key, obj) {
            obj[key] = config.apiBaseURL + path;
          }
        );
        return mapping;
      }()),

      /*
       conf for the auth system
       */
      'simple-auth': {
        store: 'simple-auth-session-store:local-storage',
        crossOriginWhitelist: ['http://*.repositive.io'],
        authorizer: 'authorizer:repositive',
        routeAfterAuthentication: 'root',
        authenticationRoute: 'users.login',
        signupRoute: 'users.signup',
        logoutRoute: 'users.logout'
      },
      'simple-auth-cookie-store': {
        cookieName: 'repositive.io'
      },
      torii: config.environment.torii,
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
        }
      ]
    };


  // if (environment === 'development') {
  //   // ENV.APP.LOG_RESOLVER = true;
  //   // ENV.APP.LOG_ACTIVE_GENERATION = true;
  //   // ENV.APP.LOG_TRANSITIONS = true;
  //   // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
  //   // ENV.APP.LOG_VIEW_LOOKUPS = true;
  // }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  // if (environment === 'testing') {
  //   ENV.locationType = 'none';
  //   ENV.torii.providers['google-oauth2'].redirectUri = 'http://testing.discover.repositive.io';
  //   ENV.torii.providers['linked-in-oauth2'].redirectUri = 'http://testing.discover.repositive.io';
  // }
  //
  // if (environment === 'production') {
  //   ENV.torii.providers['google-oauth2'].redirectUri = 'http://discover.repositive.io';
  //   ENV.torii.providers['linked-in-oauth2'].redirectUri = 'http://discover.repositive.io';
  // }

  return ENV;
};
