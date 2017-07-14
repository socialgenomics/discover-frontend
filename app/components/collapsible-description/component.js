import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'section',
  showFullDescription: false,
  truncateDescription: computed('description', function() {
    if (get(this, 'description')) {
      return get(this, 'description').trim().length > 500 ? true : false;
    }
  }),
  actions: {
    toggleDescriptionLength() {
      this.toggleProperty('showFullDescription');
    }
  }
});
