import Ember from 'ember';

const { Component, get, computed, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),
  active: computed('model', 'active', function() {
    const filterString = `${get(this, 'aggName')}:${get(this, 'bucket.key')}`;
    return get(this, 'searchService').isFilterActive(filterString);
  }),
  actions: {
    addFilter(name, key) {
      const query = get(this, 'searchService').addFilter(name, key);
      get(this, 'searchService').updateQuery(query);
      get(this, 'search')(query);
    },
    removeFilter(name, key) {
      const query = get(this, 'searchService').removeFilter(name, key);
      get(this, 'searchService').updateQuery(query);
      get(this, 'search')(query);
    }
  }
});
