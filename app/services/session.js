import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  store: Ember.inject.service('store'),
  metrics: Ember.inject.service(),

  setAuthenticatedUser: Ember.observer('data.authenticated.user', function() {
    if (this.get('isAuthenticated')) {
      const userData = this.get('data.authenticated.user');

      if (!userData) {
        // force logout
        this.invalidate();
      } else {
        let userId = userData.id;

        this.get('metrics').identify({
          email: userData.main_email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username
        });

        try {
          this.get('metrics').identify('GoogleAnalytics', {
            distinctId: this.get(userData.username)
          });
        } catch(e){
          //adapters can be disabled on some env. so we will have an error
        }

        this.get('store').findRecord('user', userId)
        .then(user => {
          user.set('email', userData.main_email);
          user.set('isEmailValidated', userData.isEmailValidated);
          this.set('authenticatedUser', user);
        });
      }
    }
  })
});
