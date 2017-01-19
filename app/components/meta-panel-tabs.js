import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  tagName: 'ul',
  classNames: ['o-list-flush-left', 'o-list-inline', 'u-ta-center'],
  actions: {
    showInfo() { get(this, 'showInfo')(); },
    showFilters() { get(this, 'showFilters')(); }
  }
});
