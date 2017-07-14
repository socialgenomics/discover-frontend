import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'ul',
  classNames: ['c-notification-list', 'list-flush-left', 'mb0']
});
