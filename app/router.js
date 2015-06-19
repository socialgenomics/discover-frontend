import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('root', {path:'/'});

  this.route('about');
  this.route('team');
  this.route('faq');
  this.route('press');
  this.route('jobs');
  this.route('help');

  this.resource('users', function(){
    this.route('signup');
    this.route('login');
    this.route('settings');
    this.route('profile');
    this.route('references');
    this.route('trust');
  });

  this.resource('user', {path: '/user/:username'}, function(){
  });

  this.resource('datasets', function(){
    this.route('detail', {path:':id'});
    this.route('tags', {path:'/tag/:tag'});
    this.route('assay', {path:'/assay/:assay'});
    this.route('search');
    this.route('register');
    this.route('request');
  });

  this.route('404', { path: '/*path' });

});


//calq page view tracking
// Router.reopen({
//   notifyCalq: function(){
//     calq.action.trackPageView( this.get('url'));
//   }.on('didTransition')
// });

export default Router;
