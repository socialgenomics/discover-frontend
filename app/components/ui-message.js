import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    closeMessages: function() {
      Ember.get(this, 'flashMessages').clearMessages();
    }
  }

});
