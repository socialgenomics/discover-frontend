import Ember from 'ember';

const { Component, inject: { service }, get, computed } = Ember;

export default Component.extend({
  session: service(),
  isAuthenticated: computed.alias('session.isAuthenticated'),

  actions: {
    trackCreateAccount(eventName) {
      get(this, 'metrics').trackEvent({
        category: eventName,
        action: 'button_clicked'
      });
    }
  }
});
