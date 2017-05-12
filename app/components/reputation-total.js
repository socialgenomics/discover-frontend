import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['c-reputation-total ta-center fc-secondary absolute border border-white'],
  classNameBindings: ['backgroundColour'],
  tagName: 'span',

  backgroundColour: computed('total', function() {
    const total = get(this, 'total');
    if (total === 0) { return 'bc-very-light-grey'; }
    if (total > 0 && total <= 10) { return 'bc-light-yellow'; }
    if (total > 10) { return 'bc-light-teal'; }
  })
});
