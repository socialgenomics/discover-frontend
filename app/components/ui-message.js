import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  actions: {
    closeMessages: function() {
      Ember.get(this, 'flashMessages').clearMessages();
      this.get('session').set('data.displayWelcomeMessage', false);
    }
  }

});
