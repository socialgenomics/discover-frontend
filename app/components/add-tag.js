import Ember from 'ember';

export default Ember.Component.extend({
  tag: null,
  isOpen: null,
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
      this.set('isOpen', true);
    },
    toggleInput: function() {
      this.toggleProperty('isOpen');
      this.sendAction('toggleEditTags');
    }
  }
});
