import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('datasets',function(){
		this.resource('dataset',{path:'/:id'});
	});
	
});

export default Router;
