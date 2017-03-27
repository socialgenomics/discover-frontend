import Ember from 'ember';

const { inject: { service }, Component, get, set, computed, Logger, RSVP } = Ember;

export default Component.extend({
  store: service(),

  classNames: ['u-border-top'],
  didReceiveAttrs() {
    this._super(...arguments);
    const uniqueContributorIds = get(this, 'userAttrs')
      .mapBy('userId')
      .uniq();
    this._fetchUserData(uniqueContributorIds)
      .then(contributors => set(this, 'contributors', contributors))
  },

  _fetchUserData(userIds) {
    const store = get(this, 'store');
    return RSVP.all(
      userIds.reduce((queries, userId) => {
        return [...queries, ...[store.findRecord('user', userId)]];
      }, [])
    ).catch(Logger.error)
  }
});
