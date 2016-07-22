import Ember from 'ember';
import config from './config/environment';
import TrackingMixin from 'repositive/mixins/tracking-mixin';

const Router = Ember.Router.extend(TrackingMixin, {
  session: Ember.inject.service(),
  location: config.locationType
});

Router.map(function() {
  this.route('root', {
    path: '/'
  });
  this.route('policies');
  this.route('beta-signup-form', {
    path: '/survey'
  });

  this.route('users', { resetNamespace: true }, function() {
    this.route('signup');
    this.route('login');
    this.route('settings');
    this.route('profile');
    this.route('trust');
    this.route('verify', {
      path: '/verify/:verificationId'
    });
    this.route('resend-password', {
      path: '/reset-password'
    });
    this.route('reset-password', {
      path: '/reset-password/:resetKey'
    });
  });

  this.route('user', {
    resetNamespace: true,
    path: '/user/:username'
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
  });

  this.route('help', { resetNamespace: true }, function() {
    this.route('searching-for-data');
    this.route('requesting-data');
    this.route('registering-new-data');
    this.route('your-account');
    this.route('other');
  });

  this.route('404', {
    path: '/*path'
  });
});

let pagesWithSideNavigation = ['datasets-search'];
let landingPage = ['root'];

Ember.Route.reopen({
  activate: function() {
    let cssClass = this.toCssClass();
    if (cssClass !== 'application') {
      Ember.$('body').addClass(cssClass);
      if (pagesWithSideNavigation.indexOf(cssClass) !== -1) {
        // Add the class here for all the pages with side navigation
        Ember.$('body').addClass('has-sidenav');
      } else if (landingPage.indexOf(cssClass) !== -1 && this.get('session.isAuthenticated') === false) {
        // Add the landing page class to home
        Ember.$('body').addClass('landing-page');
      }
    }
  },
  deactivate: function() {
    Ember.$('body').removeClass(this.toCssClass());
    Ember.$('body').removeClass('has-sidenav');
    Ember.$('body').removeClass('landing-page');
  },
  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  }
});

export default Router;
