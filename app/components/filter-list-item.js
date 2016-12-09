import Ember from 'ember';

const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),
  actions: {
    addFilter(name, key) {
      const queryString = get(this, 'searchService').addPredicate(name, key);
      get(this, 'search')(queryString);
    },
    removeFilter(name, key) {
      const queryString = get(this, 'searchService').removePredicate(name, key);
      get(this, 'search')(queryString);
    }
  }
});
