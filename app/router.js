import Ember from 'ember';

import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('login');
  this.route('profile');
  this.route('kitchensink');
  this.route('404', { path: '/*path' });
});

export default Router;
