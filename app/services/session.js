import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

const { inject: { service }, get, set, observer, Logger, RSVP } = Ember;

export default SessionService.extend({
  store: service(),
  metrics: service(),

  setAuthenticatedUser: observer('data.authenticated.user', function() {
    const userData = get(this, 'data.authenticated.user');
    // debugger;
    if (get(this, 'isAuthenticated')) {
      if (!userData) {
        // force logout
        return this.invalidate();
      }
      const userId = userData.id;
      const store = get(this, 'store');

      this._identifyUser(userData);

      return RSVP.hash({
        'user': store.findRecord('user', userId),
        'credential': store.query('credential', { 'where.user_id': userId, 'where.primary': true }),
        'user_settings': store.findRecord('user_setting', userData.user_setting.id)
      })
        .then(data => {
          const user = data.user;
          // setProperties(user, {
          //   email: get(data, 'credential.firstObject.email'),
          //   isEmailValidated: userData.isEmailValidated //TODO move to verify route
          // });

          // user.save();

          set(this, 'authenticatedUser', user);
        })
        .catch(Logger.error);
    }
  }),

  _identifyUser(userData) {
    get(this,  'metrics').identify({
      email: userData.credentials[0].email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username | userData.id,
      id: userData.id
    });

    try {
      get(this, 'metrics').identify('GoogleAnalytics', {
        distinctId: userData.id
      });
    } catch (e) {
      //adapters can be disabled on some env. so we will have an error
      Logger.warn(e);
    }
  }
});
