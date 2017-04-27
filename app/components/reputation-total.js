import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  //takes reputation object
  //renders the total of the value in the reputation object
  //depending on the total, the color will change
  classNames: ['c-reputation-total c-reputation-total-small u-ta-center u-fs0 u-tc-secondary u-pos-absolute u-border u-border-color-white'],
  classNameBindings: ['backgroundColour'],
  tagName: 'span',

  reputation: {
    quality: 0,
    verification: 5,
    ownership: 4,
    contribution: 0
  },
  //this can be move to the user model
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
