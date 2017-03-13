import Ember from 'ember';
const { Component, set } = Ember;

export default Component.extend({
  tagName: 'li',
  classNameBindings: ['active:u-fw-bold'],
  classNames: ['u-p1', 'u-hv-bc-darken5']
});
