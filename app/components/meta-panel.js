import Ember from 'ember';

const { Component, set } = Ember;

export default Component.extend({
  tagName: 'section',
  classNameBindings:['metaPanelHidden:is-hidden'],
  classNames: ['c-sidebar', 'u-pos-absolute', 'grid'],
  displayInfo: true,
  metaPanelHidden: true,
  actions: {
    showInfo() { set(this, 'displayInfo', true); },
    showFilters() { set(this, 'displayInfo', false); },
    toggleMetaPanelVisibility() { this.toggleProperty('metaPanelHidden')}
  },
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.isSearchPage) {
      set(this, 'displayInfo', false);
    }
  }
});
