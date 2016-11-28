import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  actions: {
    search(query) {
      get(this, 'search')(query);
    }
  }
});
