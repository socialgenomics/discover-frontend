import Ember from 'ember';

const { Component, computed: { equal } } = Ember;

export default Component.extend({
  classNames: ['u-border-bottom', 'u-border-fat', 'u-p2'],
  classNameBindings: ['isRegistration:u-border-color-red', 'isRequest:u-border-color-blue', 'isFavourite:u-border-color-yellow', 'isContribution:u-border-color-teal', 'isDiscussion:u-border-color-grey'],
  isRequest: equal('group', 'request'),
  isRegistration: equal('group', 'registration'),
  isFavourite: equal('group', 'favourite'),
  isContribution: equal('group', 'contribution'),
  isDiscussion: equal('group', 'discussion')
});
