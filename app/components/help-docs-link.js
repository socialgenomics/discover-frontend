import Ember from 'ember';

const { Component, get, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['c-help-link'],

  isActive: computed('query', function() {
    const queryLink = '?help=' + get(this, 'query');
    return (window.location.search === queryLink);
  })
});
