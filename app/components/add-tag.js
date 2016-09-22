import Ember from 'ember';

export default Ember.Component.extend({
  tag: null,

  actions: {
    addTag: function() {
      if (this.tag) {
        this.get('metrics').trackEvent({
          category: 'dataset',
          action: 'added tag',
          label: this.tag
        });
        this.sendAction('addTag', this.tag);
      }
      this.set('tag', null);
      this.toggleProperty('isOpen');
    },

    toggleInput: function() {
      this.toggleProperty('isOpen');
    }
  }
});
