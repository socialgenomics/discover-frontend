import Ember from 'ember';

const { Component, get, computed } = Ember;

export default Component.extend({
  classNames: ['u-pt3', 'u-mb2', 'u-flex', 'u-justify-center', 'u-flex-wrap'],

  noPrevPage: computed('currentPageNumber', function() {
    if (get(this, 'currentPageNumber') === 1) { return true; }
  }),

  noNextPage: computed('currentPageNumber', 'totalPages', function() {
    if (get(this, 'currentPageNumber') >= get(this, 'totalPages')) { return true; }
  }),

  actions: {
    nextPage() { get(this, 'nextPage')(); },
    previousPage() { get(this, 'previousPage')(); },
    thisPage() { get(this, 'thisPage')(); }
  }
});
