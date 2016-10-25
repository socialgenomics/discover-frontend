import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    trackUpdatesHeaders(header) {
      this.get('metrics').trackEvent({
        category: 'home-stats-updates',
        action: 'link clicked',
        label: header
      });
    }
  }
});
