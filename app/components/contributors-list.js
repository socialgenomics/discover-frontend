import Ember from 'ember';

const { inject: { service }, Component, get, computed, Logger } = Ember;

export default Component.extend({
  store: service(),

  classNames: ['u-border-top'],

  contributorList: computed.mapBy('userAttrs', 'userId'),
  uniqContributors: computed.uniq('contributorList'),

  contributors: computed('uniqContributors', function() {
    const contr = get(this, 'uniqContributors').toString();

    return this._getContributors(contr);
  }),

  _getContributors(contrId) {
    const store = get(this, 'store');

    return store.findRecord('user', contrId);
  },
});
