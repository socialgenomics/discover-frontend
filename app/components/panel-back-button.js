import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    trackBackClick() {
      this.get('metrics').trackEvent({
        category: this.get('type'),
        action: 'back button clicked'
      });
    }
  }
});
