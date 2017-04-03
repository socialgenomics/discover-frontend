import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  classNameBindings: ['active:u-bc-white:u-bc-off-white'],
  classNames: ['u-flex-auto'],
  active: computed(function () {
    return window.location.pathname.indexOf(get(this, 'target').split('.').pop()) > -1;
  })
});
