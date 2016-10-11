import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    trackFooterLink(link) {
      this.get('metrics').trackEvent({
        category: 'footer',
        action: 'link clicked',
        label: link
      });
    }
  }
});
