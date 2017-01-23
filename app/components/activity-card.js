import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['c-card'],
  //computed property to assign placeholder text, based on type & if own profile
  emptyText: computed('type', 'isOwnProfile', 'isFavourite', function() {
    const type = get(this, 'type');
    const isOwnProfile = get(this, 'isOwnProfile');

    if (get(this, 'isFavourite')) {
      if (isOwnProfile) {
        return "You don't have any favourite datasets yet.";
      } else {
        return "This user doesn't have any favourite datasets yet.";
      }
    }

    if (type === 'request') {
      if (isOwnProfile) {
        return "You haven't requested any data from the community yet.";
      } else {
        return "This user hasn't requested any data yet.";
      }
    }

    if (type === 'registration') {
      if (isOwnProfile) {
        return "You haven't registered any data yet.";
      } else {
        return "This user hasn't registered any data yet.";
      }
    }
  })
});
