import Ember from 'ember';

const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  search: service(),
  actions: {
    addFilter(name, key) {
      console.log('Added:', name, key);
      get(this, 'search').addPredicate(name, key);
      // get(this, 'addFilter')(aggName, bucketKey);
    },
    removeFilter(name, key) {
      console.log('Removed:', name, key);
      get(this, 'search').removePredicate(name, key);
    }
  }
});
