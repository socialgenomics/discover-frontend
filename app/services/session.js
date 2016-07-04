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
        let profileId = userData.user_profile.id;
        let settingsId = userData.user_settings.id;

        this.get('metrics').identify({
          email: userData.main_email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username
        });

        try {
          this.get('metrics').identify('GoogleAnalytics', {
            distinctId: this.get(userId)
          });
        } catch(e){
          //adapters can be disabled on some env. so we will have an error
        }
        
        
        return this.get('store').findRecord('user', userId)
        .then(user => {
          return this.get('store').findRecord('user_profile', profileId)
          .then(profile => {
            return this.get('store').query('credential', {user_id: userId})
            .then((credential) => {
              debugger;
              return this.get('store').findRecord('user_setting', settingsId)
              .then((settings) => {
                user.set('email', userData.credentials[0].email);
                user.set('isEmailValidated', userData.isEmailValidated);
                user.set('isCurrentUser', true);
                this.set('authenticatedUser', user);
                debugger;
              })
            })
          })
         
        });
      }
    }
  })
});
