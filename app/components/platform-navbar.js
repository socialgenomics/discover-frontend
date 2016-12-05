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
    },
    search() {
      get(this, 'metrics').trackEvent({
        category: 'search',
        action: 'query',
        label: get(this, 'query')
      });
      this.attrs.search(get(this, 'query'));
    }
  }
});
