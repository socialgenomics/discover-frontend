import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['c-overlay', 'u-bc-overlay-grey', 'u-ta-center', 'u-py5', 'u-pos-top0', 'u-pos-left0'],

  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_searchFilters_createAccount',
        action: 'text_link_clicked'
      });
    }
  }
});
