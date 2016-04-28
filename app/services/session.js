import Ember from 'ember';
import DS from 'ember-data';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  store: Ember.inject.service('store'),

  setAuthenticatedUser: Ember.computed('data.authenticated.user', function() {
    const userId = this.get('data.authenticated.user');

    if (this.get('isAuthenticated')) {
      if (!Ember.isEmpty(userId)) {
        return DS.PromiseObject.create({
          promise: this.get('store').find('user', userId)
          .then(user => {
            user.set('email', userData.email);
            user.set('isEmailValidated', userData.isEmailValidated);
            this.set('authenticatedUser', user);
          })
        });
      } else {
        this.invalidate();
      }
    }
  })
});
