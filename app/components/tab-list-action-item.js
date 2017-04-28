import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['cursor-pointer', 'fc-secondary', 'u-flex-auto', 'p2', 'fs2', 'u-fw-med'],
  classNameBindings: ['isActive:bc-white:bc-very-light-grey', 'isActive:bc-white:u-hv-bc-very-light-grey'],

  isActive: computed('tabName', 'activeTab', function() {
    return get(this, 'tabName') === get(this, 'activeTab');
  }),

  click() { get(this, 'setActiveTab')(get(this, 'tabName')); }
});
