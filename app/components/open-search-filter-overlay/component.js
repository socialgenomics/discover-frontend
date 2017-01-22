import Ember from 'ember';

const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['open-search-filter-overlay'],

  actions: {
    trackLinkEvent() {
      this.get('metrics').trackEvent({
        category: 'discover_openpage_searchFilters_createAccount',
        action: 'text_link_clicked'
      });
    }
  }
});
