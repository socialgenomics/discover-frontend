import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';
import { fetchCredentials, mainCredential, getLatestSecondaryCredential } from 'repositive/utils/credentials';

const { inject: { service }, get, set, observer, Logger, RSVP } = Ember;

export default SessionService.extend({
  store: service(),
  metrics: service(),

  setAuthenticatedUser: observer('data.authenticated.user', function() {
    const userData = get(this, 'data.authenticated.user');
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
        'credentials': fetchCredentials(store, userId)
      })
        .then(data => {
          if (!mainCredential(data.credentials)) {
            this._setPrimaryCredential(data.credentials);
          }
          set(this, 'authenticatedUser', data.user);
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
  },

  /**
   * @desc sets the latest credential to primary
   * @private
   * @param {Array} credentials
   */
  _setPrimaryCredential(credentials) {
    const latest = getLatestSecondaryCredential(credentials);
    set(latest, 'primary', true);
    return latest.save();
  }
});
