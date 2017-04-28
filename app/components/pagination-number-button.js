import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'a',
  classNames: ['px2', 'rounded', 'u-hv-bc-very-light-grey', 'u-hv-tc-secondary'],
  classNameBindings: ['isActive:bc-teal:fc-secondary', 'isActive:fc-primary'],

  isActive: computed('page', 'currentPageNumber', function() {
    return get(this, 'page') === get(this, 'currentPageNumber');
  }),

  click() { get(this, 'goToPage')(get(this, 'page')); }
});
