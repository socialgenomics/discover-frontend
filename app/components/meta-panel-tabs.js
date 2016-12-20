import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  tagName: 'ul',
  classNames: ['tabs'],
  actions: {
    showInfo() { get(this, 'showInfo')(); },
    showFilters() { get(this, 'showFilters')(); }
  }
});
