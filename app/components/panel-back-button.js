import Ember from 'ember';

const { Component, get } = Ember;

export default Ember.Component.extend({
  actions: {
    trackBackClick() {
      Ember.get(this, 'metrics').trackEvent({
        category: this.get('type'),
        action: 'back button clicked'
      });
    }
  }
});
