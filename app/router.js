import Ember from 'ember';
import config from './config/environment';
import TrackingMixin from 'repositive/mixins/tracking-mixin';

var Router = Ember.Router.extend(TrackingMixin, {
  location: config.locationType
});

Router.map(function() {
  this.route('root', {
    path: '/'
  });

  this.route('about');
  this.route('team');
  this.route('faq');
  this.route('press');
  this.route('jobs');
  this.route('help');
  this.route('verify');
  this.route('policies');

  this.resource('users', function() {
    this.route('signup');
    this.route('login');
    this.route('settings');
    this.route('profile');
    this.route('references');
    this.route('trust');
    this.route('verify');
  });

  this.resource('user', {
    path: '/user/:username'
  }, function() {});

  this.resource('datasets', function() {
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

  this.route('404', {
    path: '/*path'
  });

});

Ember.Route.reopen({
  activate: function() {
    var cssClass = this.toCssClass();
    // you probably don't need the application class
    // to be added to the body
    if (cssClass !== 'application') {
      Ember.$('body').addClass(cssClass);
      if (['datasets-search','users-settings'].indexOf(cssClass) !== -1){
        // Add the class here for all the pages with side navigation
        Ember.$('body').addClass('has-sidenav');
      }
    }
  },
  deactivate: function() {
    Ember.$('body').removeClass(this.toCssClass());
    Ember.$('body').removeClass('has-sidenav');
  },
  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  }
});

export default Router;
