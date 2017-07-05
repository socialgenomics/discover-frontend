import Ember from 'ember';

const { Component, get, observer, inject: { service }, set } = Ember;

export default Component.extend({
  queryService: service('query'),

  classNames: ['grid__col', 'grid__col--2-of-3', 'grid__col--centered', 'py5'],

  setQuery: observer('queryService.queryString', function() {
    const queryService = get(this, 'queryService');
    set(this, 'query', queryService.getQueryString());
  }),

  init() {
    this._super(...arguments);
    const queryService = get(this, 'queryService');
    set(this, 'query', queryService.getQueryString());
  },

  actions: {
    search(query) {
      get(this, 'search')(query.trim()); //calls search on application route
    }
  }
});
