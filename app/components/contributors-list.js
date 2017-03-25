import Ember from 'ember';

const { inject: { service }, Component, get, computed, Logger, RSVP } = Ember;

export default Component.extend({
  store: service(),

  classNames: ['u-border-top'],

  contributorIds: computed.mapBy('userAttrs', 'userId'),
  uniqContributorIds: computed.uniq('contributorIds'),
  contributors: computed('uniqContributorIds', function() {
    return this._fetchUserData(get(this, 'uniqContributorIds'));
  }),

  _fetchUserData(userIds) {
    const store = get(this, 'store');
    return RSVP.all(
      userIds.reduce((queries, userId) => {
        return [...queries, ...[store.findRecord('user', userId)]];
      }, [])
    ).catch(Logger.error)
  }
});
