import Ember from 'ember';

const { Component, computed, get, isBlank } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['c-card', 'u-p2'],

  hasAccounts: computed('user.profile.accounts', function() {
    const accounts = get(this, 'user.profile.accounts');

    if (!accounts) { return false; }

    return Object.keys(accounts)
      .reduce((state, account) => !isBlank(accounts[account]) || state, false)
  })
});
