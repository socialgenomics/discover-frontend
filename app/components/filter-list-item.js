import Ember from 'ember';

const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),
  active: function () {
    const filterString = `${get(this, 'aggName')}:${get(this, 'bucket.key')}`;
    return get(this, 'searchService').isFilterActive(filterString);
  }.property('model', 'active'),
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
