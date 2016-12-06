import Ember from 'ember';

const { Component, get, set, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),
  actions: {
    search(query) {
      const searchService = get(this, 'searchService');
      get(this, 'search')(query); //calls search on application route
      // set(this, 'query', searchService.getQueryString());
    }
  }
});
