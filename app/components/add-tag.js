import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({
  tag: null,

  actions: {
    addTag: function() {
      if (this.tag) {
        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail_tag',
          action: 'added_tag',
          label: this.tag
        });
        this.sendAction('addTag', this.tag);
      }
      set(this, 'tag', null);
      this.toggleProperty('isOpen');
    },

    toggleInput: function() {
      this.toggleProperty('isOpen');
    }
  }
});
