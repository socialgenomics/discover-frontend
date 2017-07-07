import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  tagName: 'ul',
  classNames: ['list-flush-left', 'ta-center'],
  actions: {
    showInfo() { get(this, 'showInfo')(); },
    showFilters() { get(this, 'showFilters')(); }
  }
});
