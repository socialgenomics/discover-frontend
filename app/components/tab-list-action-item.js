import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['cursor-pointer', 'fc-secondary', 'flex-grow', 'p2', 'fs2', 'fw-med'],
  classNameBindings: ['isActive:bc-white:bc-very-light-grey', 'isActive:bc-white:u-hv-bc-very-light-grey'],

  isActive: computed('tabName', 'activeTab', function() {
    return get(this, 'tabName') === get(this, 'activeTab');
  }),

  click() { get(this, 'setActiveTab')(get(this, 'tabName')); }
});
