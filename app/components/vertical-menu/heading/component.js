import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['flex', 'items-center', 'justify-between', 'p3', 'u-hv-bc-white', 'cursor-pointer', 't-vertical-menu-heading'],
  classNameBindings: ['isOpen:bc-very-light-grey'],
  isOpen: computed('openGroup', 'title', function() {
    return get(this, 'openGroup') === get(this, 'title');
  }),

  icon: computed('isOpen', function() {
    return get(this, 'isOpen') ? 'chevron-down' : 'chevron-right';
  }),

  click() {
    get(this, 'handleClick')(get(this, 'title'));
  }
});
