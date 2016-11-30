import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({
  actions: {
    addFilter(aggName, bucketKey) {
      set(this, 'bucket.selected', true);
      get(this, 'addFilter')(aggName, bucketKey);
    }
  }
});
