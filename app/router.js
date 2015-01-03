import Ember from 'ember';

import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path:'/'})

  this.resource('users', function(){
    this.route('login');
    this.route('profile');
  });

  this.resource('datasets', function(){
    this.route('detail', {path:':id'});  
    this.route('tags', {path:'/tag/:tag'});
  });

  this.route('kitchensink');
  this.route('404', { path: '/*path' });
});

export default Router;
