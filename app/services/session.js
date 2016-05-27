import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  store: Ember.inject.service('store'),

  setAuthenticatedUser: Ember.observer('data.authenticated.user', function() {
    if (this.get('isAuthenticated')) {
      const userData = this.get('data.authenticated.user');

      if (!userData) {
        // force logout
        this.invalidate();
      } else {
        let userId = userData.id;

        this.get('store').findRecord('user', userId)
        .then(user => {
          user.set('email', userData.email);
          user.set('isEmailValidated', userData.isEmailValidated);
          this.set('authenticatedUser', user);
        });
      }
    }
  })
});
