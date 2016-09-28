import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actionsService: Ember.inject.service('actions'),
  isOwnProfile: Ember.computed('model.user.id', 'session.authenticatedUser.id', function() {
    const sessionUser = this.get('session.authenticatedUser.id');
    const profileUser = this.get('model.user.id');
    if (sessionUser === profileUser) {
      return true;
    }
  }),
  numberOfFavourites: Ember.computed('actionsService.userFavourites', function() {
    const actionsService = this.get('actionsService');
    return actionsService.get('userFavourites').length;
  })
});
