import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['u-p2', 'u-border-bottom'],
  didReceiveAttrs() {
    this._super(...arguments);
    const notification = get(this, 'notification');
    debugger;
  }
});
