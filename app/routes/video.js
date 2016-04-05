import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service(),

  model: function() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('root');
    }
  }

});
