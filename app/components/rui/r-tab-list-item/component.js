import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['flex-auto', 'cursor-pointer', 'fc-secondary', 'fs2', 'fw-med'],
  classNameBindings: ['isActive:bc-white:bc-very-light-grey', 'isActive::u-hv-bc-very-light-grey'],

  isActive: computed('tabName', 'activeTab', 'setActiveTab', function() {
    if (get(this, 'setActiveTab')) {
      return get(this, 'tabName') === get(this, 'activeTab');
    } else {
      return window.location.pathname.indexOf(get(this, 'target').split('.').pop()) > -1;
    }
  }),

  click() {
    if (get(this, 'setActiveTab')) {
      get(this, 'setActiveTab')(get(this, 'tabName'));
    }
  }
});
