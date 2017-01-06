import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  init() {
    this._super(...arguments);
    //get the query string from params
  },

  //observe the query

  actions: {
    search(query) {
      get(this, 'search')(query.trim()); //calls search on application route
    }
  }
});
