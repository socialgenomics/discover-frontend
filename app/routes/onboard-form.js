import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service(),

  actions: {
    // user clicks button on welcome page to enter site
    completeForm: function() {
      this.transitionTo('welcome');
    }
  }
});
