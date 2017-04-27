import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['absolute', 'u-full-width', 'u-full-height', 'u-bc-overlay-light-bluegrey', 'u-ta-center', 'py5', 'top-0', 'left-0'],
  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_searchFilters_createAccount',
        action: 'text_link_clicked'
      });
    }
  }
});
