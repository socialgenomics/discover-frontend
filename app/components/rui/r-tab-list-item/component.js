import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['flex-auto', 'cursor-pointer', 'fc-secondary', 'flex-grow', 'p2', 'fs2', 'fw-med'],
  classNameBindings: ['isActive:bc-white:bc-very-light-grey', 'isActive::u-hv-bc-very-light-grey'],

  actionItem: false,

  isActive: computed('tabName', 'activeTab', function() {
    if (get(this, 'actionItem')) {
      return get(this, 'tabName') === get(this, 'activeTab');
    } else {
      return window.location.pathname.indexOf(get(this, 'target').split('.').pop()) > -1;
    }
  }),

  click() {
    if (get(this, 'actionItem')) {
      get(this, 'setActiveTab')(get(this, 'tabName'));
    }
  }
});
