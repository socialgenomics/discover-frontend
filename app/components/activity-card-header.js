import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['u-border-bottom', 'u-border-fat', 'u-p2'],
  classNameBindings: ['isRegistration:u-border-color-red', 'isRequest:u-border-color-blue'],
  isRequest: computed('type', function(){
    if (get(this, 'type') === 'request') { return true; }
  }),
  isRegistration: computed('type', function(){
    if (get(this, 'type') === 'registration') { return true; }
  })
});
