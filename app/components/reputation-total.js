import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['c-reputation-total u-ta-center u-tc-secondary u-pos-absolute u-border u-border-color-white'],
  classNameBindings: ['backgroundColour'],
  tagName: 'span',

  //This is dummy data and will be removed once the reputation service is operational.
  reputation: {
    quality: 1,
    verification: 4,
    ownership: 2,
    contribution: 0
  },

  //This function will be moved to the user model.
  total: computed('reputation', function() {
    const reputation = get(this, 'reputation');
    return Object.keys(reputation)
      .reduce((sum, key) => sum + reputation[key], 0)
  }),

  backgroundColour: computed('total', function() {
    const total = get(this, 'total');
    if (total === 0) { return 'u-bc-very-light-grey'; }
    if (total > 0 && total <= 10) { return 'u-bc-light-yellow'; }
    if (total > 10) { return 'u-bc-light-teal'; }
  })
});
