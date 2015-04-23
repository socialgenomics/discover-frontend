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
  });

  this.resource('datasets', function(){
    this.route('detail', {path:':id'});  
    this.route('tags', {path:'/tag/:tag'});
  });

  this.resource('search', function(){
    this.route('results', {'path':':query'});
  });

  this.route('404', { path: '/*path' });

});

export default Router;
