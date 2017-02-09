import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleTagModal: function() {
      this.sendAction();
    }
  }
});
