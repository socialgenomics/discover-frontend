import Ember from "ember";

export default Ember.Route.extend({
	model: function(){
		return this.store.find('dataset');
	},

	// Stuff below added
	actions: {
	    showModal: function(name, model) {
	      this.render(name, {
	        into: 'datasets',
	        outlet: 'modal',
	        model: model
	      });
          
	    },

	    removeModal: function() {
	      this.disconnectOutlet({
	        outlet: 'modal',
	        parentView: 'datasets'
	      });
	    }
	}
});
