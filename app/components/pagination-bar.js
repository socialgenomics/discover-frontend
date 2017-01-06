import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['pagination-bar'],
  actions: {
    nextPage(){ get(this, 'nextPage')(); },
    previousPage(){ get(this, 'previousPage')(); }
  }
});
