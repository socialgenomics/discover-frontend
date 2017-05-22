import Ember from 'ember';

const { Component, computed, inject: { service }, get, getWithDefault } = Ember;

export default Component.extend({
  session: service(),
  classNames: ['border-top'],
  canBeAContributor: computed('session.isAuthenticated', 'contributors', function() {
    const userContribution = getWithDefault(this, 'contributors', [])
      .findBy('id', get(this, 'session.authenticatedUser.id'))
    return get(this, 'session.isAuthenticated') && !userContribution;
  })
});
