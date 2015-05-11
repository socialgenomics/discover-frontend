import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('root', {path:'/'});

  this.route('help');
  this.route('about');
  this.route('team');
  this.route('faq');
  this.route('press');

  this.resource('users', function(){
    this.route('signup');
    this.route('login');
    this.route('profile');
    this.route('settings');
    this.route('references');
    this.route('trust');
  });

  this.resource('user', {path: '/user/:username'}, function(){
  });

  this.resource('datasets', function(){
    this.route('detail', {path:':id'});
    this.route('tags', {path:'/tag/:tag'});
    this.route('search');
  });

  this.route('404', { path: '/*path' });

});

export default Router;
