import Ember from 'ember';

const { Component, observer, get, set, inject: { service } } = Ember;

export default Component.extend({
  // searchService: service('search'),
  // // I couldn't find a different way to get the latest query from
  // // the service, into the search bar.
  // setQuery: observer('searchService.queryTree', function() {
  //   const searchService = get(this, 'searchService');
  //   set(this, 'query', searchService.getQueryString());
  // }),
  //
  // init() {
  //   this._super(...arguments);
  //
  //   const searchService = get(this, 'searchService');
  //
  //   set(this, 'query', searchService.getQueryString());
  // },

  actions: {
    search(query) {
      const searchService = get(this, 'searchService');
      const queryTree = searchService.updateQuery(query.trim());
      get(this, 'search')(queryTree); //calls search on application route
    }
  }
});
