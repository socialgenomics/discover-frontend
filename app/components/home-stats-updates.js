import Ember from 'ember';

const  { Component, get } = Ember;

export default Component.extend({
  actions: {
    trackUpdatesHeaders(header) {
      get(this, 'metrics').trackEvent({
        category: 'home-stats-updates',
        action: 'link clicked',
        label: header
      });
    }
  }
});
