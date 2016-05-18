import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleMarkdownModal: function() {
      this.sendAction();
    }
  }
});
