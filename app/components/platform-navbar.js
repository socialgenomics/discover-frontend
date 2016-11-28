import Ember from 'ember';

const { inject: { service }, get } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),
  isAuthenticated: Ember.computed.alias('session.isAuthenticated'),
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
