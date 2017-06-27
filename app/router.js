import Ember from 'ember';
import config from './config/environment';
import TrackingMixin from 'repositive/mixins/tracking-mixin';

const  { inject: { service }, $, Route } = Ember;
const Router = Ember.Router.extend(TrackingMixin, {
  session: service(),
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('root', {
    path: '/'
  });
  this.route('signup-survey', {
    path: '/survey'
  });

  this.route('users', { resetNamespace: true }, function() {
    this.route('signup');
    this.route('login');
    this.route('profile');
    this.route('verify', {
      path: '/verify/:verification_id'
    });
    this.route('resend-password', {
      path: '/reset-password'
    });
    this.route('reset-password', {
      path: '/reset-password/:reset_key'
    });
    this.route('change-password');
  });

  this.route('user', {
    resetNamespace: true,
    path: '/user/:id'
  }, function() {});

  this.route('datasets', { resetNamespace: true }, function() {
    this.route('detail', {
      path: ':id'
    });
    this.route('tags', {
      path: '/tag/:tag'
    });
    this.route('assay', {
      path: '/assay/:assay'
    });
    this.route('search');
    this.route('register');
    this.route('request');
    this.route('search-error');
  });

  this.route('datasources', function() {
    this.route('source', {
      path: ':id'
    });
    this.route('search-error');
  });

  this.route('collections', function() {
    this.route('collection', {
      path: ':id'
    });
    this.route('search-error');
  });

  this.route('requests', { resetNamespace: true }, function() {
    this.route('detail', {
      path: ':id'
    });
  });

  this.route('help', { resetNamespace: true }, function() {
    this.route('searching-for-data', { path: '/searching-for-data/:query' });
    this.route('requesting-data', { path: '/requesting-data/:query' });
    this.route('registering-new-data', { path: '/registering-new-data/:query' });
    this.route('your-account', { path: '/your-account/:query' });
    this.route('other', { path: '/other/:query' });
  });

  this.route('policies', { resetNamespace: true }, function() {
    this.route('web');
    this.route('privacy');
    this.route('terms');
    this.route('cookie');
    this.route('disclaimer');
  });

  this.route('404', {
    path: '/*path'
  });
  this.route('registrations', function() {});
});

let pagesWithSideNavigation = ['datasets-search', 'datasources-source', 'collections-collection'];
let landingPage = ['root'];

Route.reopen({
  session: service(),
  activate: function() {
    let cssClass = this.toCssClass();
    if (cssClass !== 'application') {
      $('body').addClass(cssClass);
      if (pagesWithSideNavigation.indexOf(cssClass) !== -1) {
        // Add the class here for all the pages with side navigation
        $('body').addClass('has-sidebar');
      } else if (landingPage.indexOf(cssClass) !== -1) {
        // Add the landing page class to home (makes background white)
        // Home-page stays grey
        if (!this.get('session.session.isAuthenticated')) {
          $('body').addClass('landing-page');
        }
      }
    }
  },
  deactivate: function() {
    $('body').removeClass(this.toCssClass());
    $('body').removeClass('has-sidebar');
    $('body').removeClass('landing-page');
  },
  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  }
});

export default Router;
