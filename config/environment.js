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
      rootURL: '/',
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
          'auth.oauth': '/auth/oauth',
          'users.login' : '/auth/login',
          'users.logout' : '/auth/logout',
          'users.signup' : '/auth/register',
          'datasets.search' : '/search',
          'collection-stats': '/collection-stats/{collection_id}',
          'collection-datasets': '/collection-datasets/{collection_id}',
          'stats': '/stats',
          'datasets.trending' : '/trending',
          'datasources' : '/datasources',
          'favourite-datasets' : '/favourites/{user_id}/dataset',
          'favourite-requests' : '/favourites/{user_id}/request',
          'users.profiles': '/users/{id}/profile',
          'reset-password': '/auth/password-reset',
          'verify-email': '/auth/verify',
          'verify-email-resend': '/auth/verify/resend',
          'share': '/share'
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
      flashMessageDefaults: {
        timeout: 5000,
        priority: 200,
        preventDuplicates: true
      },
      moment: {
        includeTimezone: 'all',
        outputFormat: 'L',
        includeLocales: ['en-gb']
      },
      torii: {
        providers: {
          'google-oauth2': {
            apiKey:      '625615936247-udf8t0o94vmk5tp48pbsdsog84g4vu93.apps.googleusercontent.com',
            redirectUri: 'http://localhost:4200'
          },
          'linked-in-oauth2': {
            apiKey:      '77moxyb7enik8v',
            redirectUri: 'http://localhost:4200'
          }
        }
      },
      contentSecurityPolicy: {
        'default-src': "'none'",
        'font-src': "'self' data: fonts.gstatic.com https://js.intercomcdn.com/fonts/",
        'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
        'script-src': "'self' 'unsafe-inline' http://docker-vm:49152 http://www.google-analytics.com/analytics.js https://d37gvrvc0wt4s1.cloudfront.net/js/v1.8/rollbar.min.js https://s3-eu-west-1.amazonaws.com/share.typeform.com/widget.js https://s3-eu-west-1.amazonaws.com/share.typeform.com/widget.js https://widget.intercom.io https://js.intercomcdn.com",
        'connect-src': "'self' 'unsafe-inline' ws://docker-vm:49152 https://api-ping.intercom.io https://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-a.intercom.io wss://nexus-websocket-b.intercom.io https://api-iam.intercom.io",
        'img-src': "'self' data: http://www.google-analytics.com https://www.gravatar.com http://i2.wp.com/dg2kcfbxc77v1.cloudfront.net http://i0.wp.com/dg2kcfbxc77v1.cloudfront.net/assets https://js.intercomcdn.com https://static.intercomassets.com/ https://dg2kcfbxc77v1.cloudfront.net/ https://s3.amazonaws.com/datasource-logos/",
        'media-src': "'self'",
        'frame-src':"'self' 'unsafe-inline' https://repositive.typeform.com/to/pktwPz https://repositive.typeform.com/to/viIWx1",
      },
      metricsAdapters: [
        {
          name: 'Gosquared',
          environments: ['production'],
          config: {
            token: 'GSN-041822-M',
            signature: '5157e5f51f0967aee05141aff8037b69'
          }
        },
        {
          name: 'GoogleAnalytics',
          config: {
            //company-wide website
            id: 'UA-54495053-1'
          },
          environments: ['production']
        },
        {
          name: 'GoogleAnalytics',
          config: {
            //discover app
            id: 'UA-54495053-2'
          },
          environments: ['production']
        },
        {
          name: 'Intercom',
          environments: ['production'],
          config: {
            id: 'tz4k4icz'
          }
        },
        {
          name: 'Intercom',
          environments: ['local-development'],
          config: {
            id: 'vdoi8br5'
          }
        },
        {
          name: 'Survicate',
          environments: ['production'],
          config: {
            code: 'vMBxljpAIEgLPliAJkMNKmjhaeDjmMhc'
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
      ENV.rootURL = '/';
      ENV.locationType = 'none';

      // keep test console output quieter
      ENV.APP.LOG_ACTIVE_GENERATION = false;
      ENV.APP.LOG_VIEW_LOOKUPS = false;

      ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'development') {
      ENV.APP.INSPECTLET_WID = 1989736952;
      ENV.torii.providers['google-oauth2'].redirectUri = 'https://discover-dev.repositive.io';
      ENV.torii.providers['linked-in-oauth2'].redirectUri = 'https://discover-dev.repositive.io';
    }

    if (environment === 'staging') {
      ENV.APP.INSPECTLET_WID = 1989736952;
      ENV.torii.providers['google-oauth2'].redirectUri = 'https://discover-staging.repositive.io';
      ENV.torii.providers['linked-in-oauth2'].redirectUri = 'https://discover-staging.repositive.io';
    }

    if (environment === 'production') {
      ENV.torii.providers['google-oauth2'].redirectUri = 'https://discover.repositive.io';
      ENV.torii.providers['linked-in-oauth2'].redirectUri = 'https://discover.repositive.io';
      ENV.APP.INSPECTLET_WID = 1989736952;
    }

    return ENV;
  }
};
