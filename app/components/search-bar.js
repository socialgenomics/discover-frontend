import Ember from 'ember';

const { Component, get, inject: { service }, set, computed } = Ember;

export default Component.extend({
  queryService: service('query'),

  init() {
    this._super(...arguments);
    const queryService = get(this, 'queryService');
    set(this, 'query', queryService.getQueryString());
  },

  query: computed('queryService.queryString', {
    get() {
      return get(this, 'queryService').getQueryString();
    },
    set(key, value) {
      return value;
    }
  }),

  actions: {
    search(query) {
      get(this, 'search')(query.trim()); //calls search on application route
    }
  }
});
