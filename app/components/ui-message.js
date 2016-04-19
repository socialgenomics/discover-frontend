import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    closeMessages: function() {
      Ember.get(this, 'flashes').clear(); // clears all visible flash messages
    }
  }

});
