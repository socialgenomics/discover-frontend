import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  actions: {
    addFilter(aggName, bucketKey) {
      get(this, 'addFilter')(aggName, bucketKey);
    },
    removeFilter(aggName) {
      get(this, 'removeFilter')(aggName);
    }
  }
});
