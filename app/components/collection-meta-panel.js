import Ember from 'ember';

export default Ember.Component.extend({
  displayInfo: true,
  actions: {
    trackBackClick() {
      this.get('metrics').trackEvent({
        category: 'collections',
        action: 'back button clicked'
      });
    },

    showInfo() {
      this.set('displayInfo', true);
    },

    showFilters() {
      this.set('displayInfo', false);
    }
  }
});
