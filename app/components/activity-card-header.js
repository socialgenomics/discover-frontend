import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['u-border-bottom', 'u-border-fat', 'u-p2'],
  classNameBindings: ['isRegistration:u-border-color-red', 'isRequest:u-border-color-blue', 'isFavourite:u-border-color-yellow'],
  isRequest: computed('group', function(){
    if (get(this, 'group') === 'request') { return true; }
  }),
  isRegistration: computed('group', function(){
    if (get(this, 'group') === 'registration') { return true; }
  }),
  isFavourite: computed('group', function(){
    if (get(this, 'group') === 'favourite') { return true; }
  })
});
