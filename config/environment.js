var _ = require('underscore');
var appConfCache = {};

function getAppConf(env) {
  if (env in appConfCache) {
    return appConfCache[env];
  } else {
    var conf = require('./app/' + env + '.json');
    appConfCache[env] = conf;
    return conf;
  }
}
/*
  app related conf.
 */

module.exports = function(environment) {
  if (environment) {
    var appConf = getAppConf(environment);

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

      /*
        The base URL path of the API.
       */
      APIBaseURL: appConf.apiBaseURL,

      /*
        Mapping of route names to API paths, needed for non ember-data calls to
        the API.
       */
      APIRoutes : (function() {
        var mapping = {
          'users.login' : '/api/users/login',
          'users.logout' : '/api/users/logout',
          'users.signup' : '/api/users',
          'datasets.search' : '/api/datasets/search',
          'datasets.trending' : '/api/datasets/search/trending',
          'invites': '/api/invites',
          'users.profiles': '/api/users/profiles',
          'reset-password': '/api/users/password-reset',
          'verify-email': '/api/users/verify',
          'verify-email-resend': '/api/users/verify/resend'
        };
        _.each(mapping,
          function(path, key, obj) {
            obj[key] =  appConf.apiBaseURL + path;
          }
        );
        return mapping;
      }()),

      /*
        conf for the auth system
       */
      'ember-simple-auth' : {
        routeAfterAuthentication: 'root',
        routeIfAlreadyAuthenticated: 'root',
        authenticationRoute: 'users.login',
        signupRoute: 'users.signup',
        logoutRoute: 'users.logout'
      },
      'simple-auth-cookie-store' : {
        cookieName: 'repositive.io'
      },
      moment: {
        includeTimezone: 'all',
        outputFormat: 'L',
        includeLocales: ['en-gb']
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
        'script-src': "'self' 'unsafe-inline' http://docker-vm:49152 http://api.calq.io http://www.google-analytics.com/analytics.js https://d37gvrvc0wt4s1.cloudfront.net/js/v1.8/rollbar.min.js https://s3-eu-west-1.amazonaws.com/share.typeform.com/widget.js http://api.calq.io https://s3-eu-west-1.amazonaws.com/share.typeform.com/widget.js https://widget.intercom.io https://js.intercomcdn.com",
        'connect-src': "'self' 'unsafe-inline' ws://docker-vm:49152 http://api.calq.io https://api-ping.intercom.io https://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-a.intercom.io wss://nexus-websocket-b.intercom.io https://api-iam.intercom.io http://www.xpressomics.com", // Allow data (ajax/websocket) from api.calq.io
        'img-src': "'self' data: http://www.google-analytics.com https://www.gravatar.com http://i2.wp.com/dg2kcfbxc77v1.cloudfront.net http://i0.wp.com/dg2kcfbxc77v1.cloudfront.net/assets https://js.intercomcdn.com https://static.intercomassets.com/",
        'media-src': "'self'",
        'frame-src':"'self' 'unsafe-inline' https://repositive.typeform.com/to/pktwPz",
      },
      metricsAdapters: [
        {
          name: 'GoogleAnalytics',
          config: {
            id: 'UA-54495053-1'
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
        {
          name: 'Gosquared',
          environments: ['production'],
          config: {
            token: 'GSN-041822-M',
            signature: 'd88198c60ca1d4b9077bee59bfd69381'
          }
        },
        {
          name: 'Intercom',
          environments: ['production'],
          config: {
            id: 'tz4k4icz'
          }
        }
      ],
      rollbar: {
        // enabled only on online servers
        enabled: ['local-development', 'test'].indexOf(environment) === -1,
        accessToken: '96bd2d6a6d5d400aa904f399e88768ce'
      }
    };

    if (environment === 'local-development') {
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
      ENV.torii.providers['google-oauth2'].redirectUri = 'http://discover.repositive.io';
      ENV.torii.providers['linked-in-oauth2'].redirectUri = 'http://discover.repositive.io';
      ENV.APP.INSPECTLET_WID = 1989736952;
    }

    return ENV;
  }
};
