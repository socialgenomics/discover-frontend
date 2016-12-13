import Ember from 'ember';

const { Component, inject: { service }, get, computed } = Ember;

export default Component.extend({
  session: service(),
  isAuthenticated: computed.alias('session.isAuthenticated'),
  query: '',

  actions: {
    trackCreateAccount(route) {
      get(this, 'metrics').trackEvent({
        category: route,
        action: 'create account button',
        label: 'clicked'
      });
    }
  }
});
