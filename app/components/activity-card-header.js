import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['u-border-bottom', 'u-border-fat', 'u-p2'],
  classNameBindings: ['isRegistration:u-border-color-red', 'isRequest:u-border-color-blue', 'isFavourite:u-border-color-yellow', 'isContribution:u-border-color-teal', 'isDiscussion:u-border-color-grey'],
  isRequest: computed('group', function() {
    if (get(this, 'group') === 'request') { return true; }
  }),
  isRegistration: computed('group', function() {
    if (get(this, 'group') === 'registration') { return true; }
  }),
  isFavourite: computed('group', function() {
    if (get(this, 'group') === 'favourite') { return true; }
  }),
  isContribution: computed('group', function() {
    if (get(this, 'group') === 'contribution') { return true; }
  }),
  isDiscussion: computed('group', function() {
    if (get(this, 'group') === 'discussion') { return true; }
  })
});
