import Ember from 'ember';
import { storageFor } from 'ember-local-storage';


const { Component, get, set, inject: { service } } = Ember;

export default Component.extend({
  session: service(),

  tagName: 'section',
  classNameBindings: ['metaPanelHidden:is-hidden'],
  classNames: ['c-sidebar', 'absolute', 'grid'],
  displayInfo: true,
  metaPanelHidden: false,

  uiState: storageFor('uiState'),

  init() {
    this._super(...arguments);

    const VIEWPORT_WIDTH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    //Only hide the side panel by default if on mobile.
    if (VIEWPORT_WIDTH < 680 || get(this, 'uiState.hideMetaPanel') ) { set(this, 'metaPanelHidden', true) }
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
    toggleMetaPanelVisibility() {
      this.toggleProperty('metaPanelHidden');
      this._setVisibilityPreference(get(this, 'metaPanelHidden'));
    }
  },

  /**
   * @desc save current hidden preference to session
   * @param {Boolean} hidden
   * @private
   */
  _setVisibilityPreference(hidden) {
    set(this, 'uiState.hideMetaPanel', hidden);
  }
});
