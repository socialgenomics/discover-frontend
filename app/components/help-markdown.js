import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['mb4', 'px4'],

  didReceiveAttrs() {
    this._super(...arguments);
    debugger;
  }
});
