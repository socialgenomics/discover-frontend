import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  //takes reputation object
  //renders the total of the value in the reputation object
  //depending on the total, the color will change
  classNames: ['u-p1 u-circle u-fs0 u-tc-secondary'],
  classNameBindings: ['backgroundColour'],
  tagName: 'span',

  reputation: {
    quality: 0,
    verification: 5,
    ownership: 4,
    contribution: 1
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
