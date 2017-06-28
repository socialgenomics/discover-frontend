import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['p3'],
  linkTarget: computed('type', function() {
    return get(this, 'type') + 's.detail';
  })
});
