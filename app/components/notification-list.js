import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'ul',
  classNames: ['c-notification-list', 'o-list-flush-left', 'u-mb0']
});
