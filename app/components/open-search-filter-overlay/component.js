import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['u-pos-absolute', 'u-full-width', 'u-full-height', 'u-bc-overlay-light-bluegrey', 'u-ta-center', 'py5', 'u-pos-top0', 'u-pos-left0'],
  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_searchFilters_createAccount',
        action: 'text_link_clicked'
      });
    }
  }
});
