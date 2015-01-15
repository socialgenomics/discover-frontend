//this is the index controller for the index template and the index route.
App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	logo: '/img/logo.png',
	//this returns the current date
	time: function(){
		return(new Date()).toDateString();
	}.property()
});