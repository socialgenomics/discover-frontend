import Ember from 'ember';

const { Component, set } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['c-sidebar', 'u-pos-absolute', 'grid'],
  displayInfo: true,
  actions: {
    showInfo() { set(this, 'displayInfo', true); },
    showFilters() { set(this, 'displayInfo', false); }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.isSearchPage) {
      set(this, 'displayInfo', false);
    }
  }
});
