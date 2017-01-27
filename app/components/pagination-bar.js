import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  actions: {
    nextPage() { get(this, 'nextPage')(); },
    previousPage() { get(this, 'previousPage')(); }
  }
});
