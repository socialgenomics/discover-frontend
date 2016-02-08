import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  store: Ember.inject.service('store'),
  setAuthenticatedUser: Ember.observer('data.authenticated.user', function() {
    if (this.get('isAuthenticated')) {
      let userData = this.get('data.authenticated.user');

      let userId = userData.id;
      let profileId = userData.ProfileId;
      delete userData.id;
      delete userData.ProfileId;

      let jsonAPIUser = {
        data: {
          id: userId,
          type: 'user',
          attributes: userData,
          relationships: {
            profile: {
              data: {
                id: profileId,
                type: 'profile'
              }
            }
          }
        }
      };

      let authenticatedUser = this.get('store').push(jsonAPIUser);
      this.set('authenticatedUser', authenticatedUser);
    }
  })
});
