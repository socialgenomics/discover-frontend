/* eslint-env node */

module.exports = function (environment) {
  if (!environment) {
    return;
  }

  let ENV = {
    modulePrefix: 'repositive',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    /*
    The base URL path of the API.
    */
    // APIBaseURL: appConf.apiBaseURL,
    APIBaseURL: process.env.API_BASE_URL,

    /*
    Mapping of route names to API paths, needed for non ember-data calls to
        the API.
    */
    APIRoutes: (function () {
      const mapping = {
        'auth.oauth': '/auth/oauth',
        'avatar': '/avatar',
        'collection-datasets': '/collection-datasets/{collection_id}',
        'collection-stats': '/collection-stats/{collection_id}',
        'datasets.search': '/search',
        'datasets.trending': '/trending',
        'datasources': '/datasources?limit={limit}',
        'favourite-datasets': '/favourites/{user_id}/dataset',
        'favourite-requests': '/favourites/{user_id}/request',
        'make-primary': '/make-primary',
        'reset-password': '/auth/password-reset',
        'share': '/share',
        'stats': '/stats',
        'users.login': '/auth/login',
        'users.logout': '/auth/logout',
        'users.profiles': '/users/{id}/profile',
        'users.signup': '/auth/register',
        'verify-email-resend': '/auth/verify/resend',
        'verify-email': '/auth/verify',
        'autocomplete': '/autocomplete',
        'new-bookmarks': {
          'view-collections': '/new-bookmarks/view-collections',
          'view-collection': '/new-bookmarks/view-collection',
          'view-bookmarks': '/new-bookmarks/view-bookmarks',
          'view-bookmark': '/new-bookmarks/view-bookmark',
          'create-bookmark': '/new-bookmarks/create-bookmark',
          'add-notes-to-bookmark': '/new-bookmarks/add-notes-to-bookmark',
          'delete-bookmark': '/new-bookmarks/delete-bookmark',
          'create-collection': '/new-bookmarks/create-collection',
          'change-collection-name': '/new-bookmarks/change-collection-name',
          'delete-collection': '/new-bookmarks/delete-collection',
          'add-bookmark-to-collection': '/new-bookmarks/add-bookmark-to-collection',
          'delete-bookmark-from-collection': '/new-bookmarks/delete-bookmark-from-collection',
          'count-bookmarks': '/new-bookmarks/view-bookmarks-count-for-resource?id={id}'
        }
      };

      function prefixWithBaseUrl(obj) {
        return Object.keys(obj)
          .reduce((acc, key) => {
            if (typeof obj[key] === 'object') {
              return { ...acc, [key]: prefixWithBaseUrl(obj[key]) };
            } else {
              return { ...acc, [key]: `${process.env.API_BASE_URL || ''}${obj[key]}` };
            }
          },
          {});
      }
      return prefixWithBaseUrl(mapping);
    }()),

    /*
    conf for the auth system
    */
    'ember-simple-auth': {
      routeAfterAuthentication: 'root',
      routeIfAlreadyAuthenticated: 'root',
      authenticationRoute: 'users.login',
      signupRoute: 'users.signup',
      logoutRoute: 'users.logout'
    },
    'simple-auth-cookie-store': {
      cookieName: 'repositive.io'
    },
    flashMessageDefaults: {
      timeout: 5000,
      extendedTimeout: 1000,
      priority: 200,
      preventDuplicates: true
    },
    showdown: {
      simplifiedAutoLink: true,
      literalMidWordUnderscores: true
    },
    moment: {
      includeTimezone: 'all',
      outputFormat: 'L',
      includeLocales: ['en-gb']
    },
    torii: {
      providers: {
        'google-oauth2': {
          apiKey: '625615936247-udf8t0o94vmk5tp48pbsdsog84g4vu93.apps.googleusercontent.com',
          redirectUri: 'http://localhost:4200'
        },
        'linked-in-oauth2': {
          apiKey: '77moxyb7enik8v',
          redirectUri: 'http://localhost:4200'
        }
      }
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'font-src': "'self' data: fonts.gstatic.com https://js.intercomcdn.com/fonts/",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' http://docker-vm:49152 http://www.google-analytics.com/analytics.js https://s3-eu-west-1.amazonaws.com/share.typeform.com/widget.js https://s3-eu-west-1.amazonaws.com/share.typeform.com/widget.js https://widget.intercom.io https://js.intercomcdn.com",
      'connect-src': "'self' 'unsafe-inline' ws://docker-vm:49152 https://api-ping.intercom.io https://nexus-websocket-a.intercom.io https://nexus-websocket-b.intercom.io wss://nexus-websocket-a.intercom.io wss://nexus-websocket-b.intercom.io https://api-iam.intercom.io",
      'img-src': "'self' data: https://github.com/ https://pubads.g.doubleclick.net/ https://raw.githubusercontent.com *.repositive.io *.googleusercontent.com http://www.google-analytics.com https://www.gravatar.com http://i2.wp.com/dg2kcfbxc77v1.cloudfront.net http://i0.wp.com/dg2kcfbxc77v1.cloudfront.net/assets https://js.intercomcdn.com https://static.intercomassets.com/ https://dg2kcfbxc77v1.cloudfront.net/ https://s3.amazonaws.com/datasource-logos/",
      'media-src': "'self'",
      'frame-src': "'self' 'unsafe-inline' https://repositive.typeform.com/to/pktwPz https://repositive.typeform.com/to/viIWx1"
    },
    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        config: {
          id: 'UA-54495053-7'
        },
        environments: ['production']
      },
      {
        name: 'Intercom',
        environments: ['production'],
        config: {
          appId: 'tz4k4icz'
        }
      },
      {
        name: 'Intercom',
        environments: ['local-development'],
        config: {
          appId: 'vdoi8br5'
        }
      }
    ]
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
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.APP.INSPECTLET_WID = 1989736952;
    ENV.torii.providers['google-oauth2'].redirectUri = 'https://discover-dev.repositive.io';
    ENV.torii.providers['linked-in-oauth2'].redirectUri = 'https://discover-dev.repositive.io';
  }

  if (environment === 'production') {
    ENV.torii.providers['google-oauth2'].redirectUri = 'https://discover.repositive.io';
    ENV.torii.providers['linked-in-oauth2'].redirectUri = 'https://discover.repositive.io';
    ENV.APP.INSPECTLET_WID = 1989736952;
  }

  return ENV;
};
