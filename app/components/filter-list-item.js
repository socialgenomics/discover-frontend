import Ember from 'ember';

const { Component, get, computed, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),
  active: computed('model', 'active', function() {
    const filterString = `${get(this, 'aggName')}:${get(this, 'bucket.key')}`;
    return get(this, 'searchService').isFilterActive(filterString);
  }),
  sendFilterAction: function (query) {
    get(this, 'searchService').updateQuery(query);
    get(this, 'search')(query);
  },
  actions: {
    addFilter(name, key) {
      const query = get(this, 'searchService').addFilter(name, key);
      this.sendFilterAction(query);
    },
    removeFilter(name, key) {
      const query = get(this, 'searchService').removeFilter(name, key);
      this.sendFilterAction(query);
    }
  }
});
