import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    trackUpdatesHeaders(header) {
      this.get('metrics').trackEvent({
        category: 'discover_homeauth_homestats',
        action: header + '_link_clicked'
      });
    }
  }
});
