import Ember from 'ember';

const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['c-filter-overlay', 'u-ta-center', 'u-py4'],

  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_searchFilters_createAccount',
        action: 'text_link_clicked'
      });
    }
  }
});
