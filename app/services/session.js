import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

const { inject: { service }, get, set, setProperties, observer, Logger, RSVP } = Ember;

export default SessionService.extend({
  store: service(),
  metrics: service(),

  setAuthenticatedUser: observer('data.authenticated.user', function() {
    // debugger;
    if (get(this, 'isAuthenticated')) {
      const userData = get(this, 'data.authenticated.user');

      if (!userData) {
        // force logout
        this.invalidate();
      } else {
        let userId = userData.id;
        let settingsId = userData.user_setting.id;

        get(this,  'metrics').identify({
          email: userData.credentials[0].email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username | userData.id,
          id: userData.id
        });

        try {
          get(this, 'metrics').identify('GoogleAnalytics', {
            distinctId: get(this, userId)
          });
        } catch (e) {
          //adapters can be disabled on some env. so we will have an error
        }

        return RSVP.all([
          get(this, 'store').findRecord('user', userId),
          get(this, 'store').query('credential', { 'where.user_id': userId, 'where.primary': true }),
          get(this, 'store').findRecord('user_setting', settingsId)
        ])
        .then(data => {
          const user = data[0];
          const credentials = data[1].content;

          setProperties(user, {
            email: credentials[0].email,
            isEmailValidated: userData.isEmailValidated,
            isCurrentUser: true
          });

          user.save();

          set(this, 'authenticatedUser', user);
        })
        .catch(Logger.error);
      }
    }
  })
});
