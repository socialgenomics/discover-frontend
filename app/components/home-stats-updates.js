import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  actions: {
    trackUpdatesHeaders(header) {
      get(this, 'metrics').trackEvent({
        category: 'discover_homeauth_homestats',
        action: header + '_link_clicked',
        label: header
      });
    }
  }
});
