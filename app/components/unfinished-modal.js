import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleModal: function() {
      this.sendAction();
    }
  }
});
