import Ember from 'ember';

const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),
  actions: {
    addFilter(name, key) {
      const queryString = get(this, 'searchService').addFilter(name, key);
      get(this, 'search')(queryString);
    },
    removeFilter(name, key) {
      const queryString = get(this, 'searchService').removeFilter(name, key);
      get(this, 'search')(queryString);
    }
  }
});
