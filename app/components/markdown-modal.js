import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleMarkdownModal: function() {
      this.sendAction();
    }
  },
  destinationElementId: function () {
    return Ember.testing ? 'ember-testing' : undefined;
  }.property()
});
