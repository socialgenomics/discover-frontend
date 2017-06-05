import Ember from 'ember';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  classNames: ['c-card'],

  isCollapsed: true,

  emptyText: computed('group', 'isOwnProfile', function() {
    const group = get(this, 'group');
    const isOwnProfile = get(this, 'isOwnProfile');

    if (group === 'favourite') {
      if (isOwnProfile) {
        return `You don't have any favourite datasets yet.`;
      } else {
        return `This user doesn't have any favourite datasets yet.`;
      }
    }

    if (group === 'request') {
      if (isOwnProfile) {
        return `You haven't requested any data from the community yet.`;
      } else {
        return `This user hasn't requested any data yet.`;
      }
    }

    if (group === 'registration') {
      if (isOwnProfile) {
        return `You haven't registered any data yet.`;
      } else {
        return `This user hasn't registered any data yet.`;
      }
    }

    if (group === 'contribution') {
      if (isOwnProfile) {
        return `You haven't added any tags or metadata to a dataset yet.`;
      } else {
        return `This user hasn't added any tags or metadata to a dataset yet.`;
      }
    }

    if (group === 'discussion') {
      if (isOwnProfile) {
        return `You haven't taken part in any discussions yet.`;
      } else {
        return `This user hasn't taken part in any discussions yet.`;
      }
    }
  }),

  actions: {
    viewAll() {
      this._expandCard();
    },
    showLess() {
      this._collapseCard();
    }
  },

  _expandCard() {
    //if a fetch action has been passed in
      //trigger fetch.
      //show loading state. then...
    set(this, 'isCollapsed', false);
  },

  _collapseCard() {
    set(this, 'isCollapsed', true);
  }
});
