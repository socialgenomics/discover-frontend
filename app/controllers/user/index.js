import Ember from 'ember';
const { inject: { service }, Controller, computed } = Ember;

export default Controller.extend({
  session: service(),
  favouritesService: service('favourites'),
  isOwnProfile: computed('model.user.id', 'session.authenticatedUser.id', function() {
    const sessionUser = this.get('session.authenticatedUser.id');
    const profileUser = this.get('model.user.id');
    if (sessionUser === profileUser) {
      return true;
    }
  }),
  // Watches isOwnProfile so that the stat updates for each user profile.
  // TODO move user's stats into component to not have this issue with state.
  numberOfFavourites: computed('isOwnProfile', function() {
    const profileUser = this.get('model.user.id');
    const allActions = this.store.peekAll('action');
    const allUserFavourites = allActions.filter((action) => {
      if (action.get('userId.id') === profileUser && action.get('type') === 'favourite') {
        return true;
      }
    });
    return allUserFavourites.length;
  })
});
