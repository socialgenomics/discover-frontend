import Ember from 'ember';
import layout from 'ui-library/components/r-tab-list-item/template';

const { Component, computed, get, inject: { service } } = Ember;

export default Component.extend({
  router: service('-routing'),

  layout,

  tagName: 'li',
  classNames: ['flex-auto cursor-pointer fc-secondary fs2 fw-med p2'],
  classNameBindings: ['isActive:bc-white:bc-very-light-grey', 'isActive::u-hv-bc-very-light-grey'],

  isActive: computed('tabName', 'activeTab', 'setActiveTab', function() {
    if (get(this, 'setActiveTab')) {
      return get(this, 'tabName') === get(this, 'activeTab');
    } else {
      const currentPath = get(this, 'router.currentPath');
      const target = get(this, 'target');
      return currentPath.indexOf(target) > -1;
    }
  }),

  click() {
    if (get(this, 'setActiveTab')) {
      get(this, 'setActiveTab')(get(this, 'tabName'));
    }
  }
});
