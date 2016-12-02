import Ember from 'ember';

const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  search: service(),
  actions: {
    search(query) {
      const searchSession = get(this, 'search');
      searchSession.updateQuery(query);
    }
  }
});
