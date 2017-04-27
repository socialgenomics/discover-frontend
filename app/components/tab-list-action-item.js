import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['u-cursor-pointer', 'u-tc-secondary', 'u-flex-auto', 'p2', 'u-fs2', 'u-fw-med'],
  classNameBindings: ['isActive:u-bc-white:u-bc-off-white', 'isActive:u-bc-white:u-hv-bc-off-white'],

  isActive: computed('tabName', 'activeTab', function() {
    return get(this, 'tabName') === get(this, 'activeTab');
  }),

  click() { get(this, 'setActiveTab')(get(this, 'tabName')); }
});
