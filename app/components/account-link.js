import Ember from 'ember';

const { Component, get, computed } = Ember;

export default Component.extend({
  accountImg: computed('accountName', function() {
    return get(this, 'accountName').toLowerCase();
  })
});
