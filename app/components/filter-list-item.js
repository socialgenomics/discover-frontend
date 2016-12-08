import Ember from 'ember';

const { Component, get, inject: { service } } = Ember;

export default Component.extend({
  search: service(),
  actions: {
    addFilter(name, key) {
      get(this, 'search').addPredicate(name, key);
    },
    removeFilter(name, key) {
      get(this, 'search').removePredicate(name, key);
    }
  }
});
