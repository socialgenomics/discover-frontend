import Ember from 'ember';

const { Component, computed: { equal } } = Ember;

export default Component.extend({
  classNames: ['border-bottom', 'border-fat', 'p3'],
  classNameBindings: ['isRegistration:border-red', 'isRequest:border-blue', 'isFavourite:border-yellow', 'isContribution:border-teal', 'isDiscussion:border-grey'],
  isRequest: equal('group', 'request'),
  isRegistration: equal('group', 'registration'),
  isFavourite: equal('group', 'favourite'),
  isContribution: equal('group', 'contribution'),
  isDiscussion: equal('group', 'discussion')
});
