import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  tagName: 'li',
  classNameBindings: ['active:u-fw-bold'],
  classNames: ['u-fw-reg', 'u-p1', 'u-hv-bc-darken5'],
});
