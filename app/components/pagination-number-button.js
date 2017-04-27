import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'a',
  classNames: ['px2', 'u-rounded', 'u-hv-bc-off-white', 'u-hv-tc-secondary'],
  classNameBindings: ['isActive:u-bc-teal:u-tc-secondary', 'isActive:u-tc-white'],

  isActive: computed('page', 'currentPageNumber', function() {
    return get(this, 'page') === get(this, 'currentPageNumber');
  }),

  click() { get(this, 'goToPage')(get(this, 'page')); }
});
