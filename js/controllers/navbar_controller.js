App.NavbarController = Ember.ArrayController.extend({
  isAuthenticated: false,
  actions:{
  	login: function() {
	  this.set('isAuthenticated', true);
	},
	logout: function() {
	  this.set('isAuthenticated', false);
	}
  }  
});