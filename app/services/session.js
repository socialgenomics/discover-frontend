import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  store: Ember.inject.service('store'),
  setAuthenticatedUser: Ember.observer('data.authenticated.user', function() {
    if (this.get('isAuthenticated')) {
      let userData = this.get('data.authenticated.user');

      if (!userData) {
        /*
          stale session data - force logout
         */
        this.invalidate();
      } else {
        let userId = userData.id;

        this.get('store')
        .findRecord('user', userId)
        .then(user => {
          // HACK: add the private stuff from the session data.
          user.set('email', userData.email);
          user.set('isEmailValidated', userData.isEmailValidated);
          this.set('authenticatedUser', user);
        });
      }
    }
  })
});
