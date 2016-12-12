import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['metadata-panel'],
  displayInfo: true,
  actions: {
    showInfo() {
      this.set('displayInfo', true);
    },

    showFilters() {
      this.set('displayInfo', false);
    }
  }
});
