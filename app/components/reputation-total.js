import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  //takes reputation object
  //renders the total of the value in the reputation object
  //depending on the total, the color will change
  tagName: 'span',
  reputation: {
    quality: 10,
    verification: 5,
    ownership: 4,
    contribution: 1
  },
  total: computed('reputation', function() {
    const reputation = get(this, 'reputation');
    return Object.keys(reputation)
      .reduce((sum, key) => sum + reputation[key], 0)
  }),
  colour: computed('total', function() {
    const total = get(this, 'total');
    if (total === 0) { return 'grey'; }
    if (total > 0 && total <= 10) { return 'yellow'; }
    if (total > 10) { return 'teal'; }
  })
});
