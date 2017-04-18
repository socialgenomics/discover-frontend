import Ember from 'ember';

const { Component, get, computed } = Ember;

export default Component.extend({
  accountImg: computed('accountName', function() {
    return get(this, 'accountName').toLowerCase();
  }),

  accountLink: computed('account', function() {
    if (get(this, 'account').charAt(0) === '@') {
      return 'https://twitter.com/' + get(this, 'account');
    } else {
      return get(this, 'account');
    }
  })
});
