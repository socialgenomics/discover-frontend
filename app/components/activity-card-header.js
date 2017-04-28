import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['border-bottom', 'border-fat', 'p3'],
  classNameBindings: ['isRegistration:border-red', 'isRequest:border-blue', 'isFavourite:border-yellow'],
  isRequest: computed('group', function() {
    if (get(this, 'group') === 'request') { return true; }
  }),
  isRegistration: computed('group', function() {
    if (get(this, 'group') === 'registration') { return true; }
  }),
  isFavourite: computed('group', function() {
    if (get(this, 'group') === 'favourite') { return true; }
  })
});
