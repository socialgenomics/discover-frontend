import Ember from 'ember';

const { inject: { service }, Component, get, set, Logger, RSVP } = Ember;

export default Component.extend({
  store: service(),

  classNames: ['u-border-top'],
  didReceiveAttrs() {
    this._super(...arguments);
    if (get(this, 'userAttrs')) {
      const uniqueContributorIds = get(this, 'userAttrs')
        .mapBy('userId')
        .uniq();
      this._fetchUserData(uniqueContributorIds)
        .then(contributors => set(this, 'contributors', contributors))
    }
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
