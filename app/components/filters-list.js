import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  tagName: 'nav',
  classNames: ['side-nav filters-list'],
  actions: {
    addFilter(aggName, bucketKey) {
      get(this, 'addFilter')(aggName, bucketKey);
    },
    removeFilter(aggName) {
      get(this, 'removeFilter')(aggName);
    }
  }
});
