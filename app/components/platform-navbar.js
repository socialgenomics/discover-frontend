import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  isAuthenticated: Ember.computed.alias('session.isAuthenticated'),
  query: '',

  actions: {
    search: function() {
      this.get('metrics').trackEvent({
        category: 'search',
        action: 'query',
        label: this.get('query')
      });
      this.attrs.search(this.get('query'));
      // this.sendAction('action', this.get('query'));
    }
  }
});
