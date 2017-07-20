import Ember from 'ember';

const { Component, set, inject: { service } } = Ember;

export default Component.extend({
  session: service(),

  tagName: 'section',
  classNameBindings: ['metaPanelHidden:is-hidden'],
  classNames: ['c-sidebar', 'absolute', 'grid'],
  displayInfo: true,
  metaPanelHidden: false,

  init() {
    this._super(...arguments);

    const VIEWPORT_WIDTH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    //Only hide the side panel by default if on mobile.
    if (VIEWPORT_WIDTH < 680) { set(this, 'metaPanelHidden', true) }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.isSearchPage) {
      set(this, 'displayInfo', false);
    }
  },

  actions: {
    showInfo() { set(this, 'displayInfo', true); },
    showFilters() { set(this, 'displayInfo', false); },
    toggleMetaPanelVisibility() { this.toggleProperty('metaPanelHidden'); }
  }
});
