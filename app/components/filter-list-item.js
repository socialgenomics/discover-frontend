import Ember from 'ember';

const { Component, computed, get, set, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),
  active: function () {
    const filterString = `${get(this, 'aggName')}:${get(this, 'bucket.key')}`;
    return get(this, 'searchService').isFilterActive(filterString);
  }.property('model', 'active'),
  // init() {
  //   this._super(...arguments);
  //   const filterString = `${get(this, 'aggName')}:${get(this, 'bucket.key')}`;
  //   set(this, 'active', get(this, 'searchService').isFilterActive(filterString));
  // },
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
