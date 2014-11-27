import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

//var Router  = Ember.Router.extend(AuthenticatedRouteMixin)

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('login');
  this.route('protected')
  this.route('kitchensink');
  this.route('404', { path: '/*path' });
});

export default Router;
