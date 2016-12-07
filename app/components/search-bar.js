import Ember from 'ember';

const { Component, observer, get, set, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),
  // I couldn't find a different way to get the latest query from
  // the service, into the search bar.
  setQuery: observer('searchService.queryString', function() {
    set(this, 'query', get(this, 'searchService').getQueryString());
  }),
  init() {
    this._super(...arguments);
    set(this, 'query', get(this, 'searchService').getQueryString());
  },
  actions: {
    search(query) {
      get(this, 'search')(query); //calls search on application route
    }
  }
});
