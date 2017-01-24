import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['c-card'],
  
  emptyText: computed('group', 'isOwnProfile', function() {
    const group = get(this, 'group');
    const isOwnProfile = get(this, 'isOwnProfile');

    if (group === 'favourite') {
      if (isOwnProfile) {
        return "You don't have any favourite datasets yet.";
      } else {
        return "This user doesn't have any favourite datasets yet.";
      }
    }

    if (group === 'request') {
      if (isOwnProfile) {
        return "You haven't requested any data from the community yet.";
      } else {
        return "This user hasn't requested any data yet.";
      }
    }

    if (group === 'registration') {
      if (isOwnProfile) {
        return "You haven't registered any data yet.";
      } else {
        return "This user hasn't registered any data yet.";
      }
    }
  })
});
