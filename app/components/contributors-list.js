import Ember from 'ember';

const { inject: { service }, Component, get, computed, Logger, RSVP } = Ember;

export default Component.extend({
  store: service(),

  classNames: ['u-border-top'],

  contributorList: computed.mapBy('userAttrs', 'userId'),
  uniqContributors: computed.uniq('contributorList'),

  contributors: computed('uniqContributors', function() {
    const id = get(this, 'uniqContributors');

    return this._getContributors(id);
  }),

  _getContributors(id) {
    const store = get(this, 'store');

    return store.query('user', {
      'where.id': id,
    });
  }
});
