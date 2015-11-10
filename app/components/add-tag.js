import Ember from 'ember';

export default Ember.Component.extend({
  tag: null,
  isOpen: null,
  actions: {
    addTag: function() {
      if (this.tag) {
        this.get('metrics').trackEvent({
          category: 'dataset',
          action: 'tag',
          label: this.get('dataset.id')
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
