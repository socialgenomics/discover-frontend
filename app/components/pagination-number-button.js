import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'p',

  isActive: computed('page', 'currentPageNumber', function() {
    return get(this, 'page') === get(this, 'currentPageNumber');
  }),

  actions: {
    goToPage(page) { get(this, 'goToPage')(page); }
  }
});
