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
          email: userData.credentials[0].email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username | userData.id,
          id: userData.id
        });

        try {
          this.get('metrics').identify('GoogleAnalytics', {
            distinctId: this.get(userId)
          });
        } catch(e) {
          //adapters can be disabled on some env. so we will have an error
        }

        return Ember.RSVP.all([
          this.get('store').findRecord('user', userId),
          this.get('store').query('credential', { 'where.user_id': userId, 'where.primary': true }),
          this.get('store').findRecord('user_profile', profileId),
          this.get('store').findRecord('user_setting', settingsId)
        ])
        .then(data => {
          let user = data[0];
          let credentials = data[1].content;
          let profile = data[2];
          user.set('email', credentials[0].email);
          user.set('isEmailValidated', userData.isEmailValidated);
          user.set('isCurrentUser', true);
          user.set('profile', profile);
          user.save();
          this.set('authenticatedUser', user);
        });
      }
    }
  })
});
