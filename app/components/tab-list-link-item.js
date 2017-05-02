import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNameBindings: ['active:bc-white:bc-very-light-grey'],
  classNames: ['flex-grow'],
  active: computed(function () {
    return window.location.pathname.indexOf(get(this, 'target').split('.').pop()) > -1;
  })
});
