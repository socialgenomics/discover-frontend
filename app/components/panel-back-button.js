import Ember from 'ember';

const { Component, get } = Ember;

export default Ember.Component.extend({
  actions: {
    trackBackClick() {
      get(this, 'metrics').trackEvent({
        category: get(this, 'route'),
        action: 'back button clicked'
      });
    }
  }
});
