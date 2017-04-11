import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { computed, get, inject: { service }, Route, RSVP } = Ember;

export function isVerified(credentials) {
  return credentials.reduce((acc, curr) => acc || get(curr, 'verified'), false);
}

export function mainCredential(credentials) {
  return credentials.filter((c) => get(c, 'primary'))[0];
}

export function allCredentials(credentials) {
  return credentials;
}

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  userId: computed.alias('session.data.authenticated.user.id'),

  model() {
    return RSVP.hash({
      user: this.store.findRecord('user', get(this, 'userId')),
      credential: this.store.query('credential', {
        'where.user_id': get(this, 'userId')
      }).then((credentials) => {
        return {
          is_verified: isVerified(credentials),
          main_credential: mainCredential(credentials),
          all_credentials: allCredentials(credentials)
        };
      })
    });
  },

  actions: {
    reloadModel() {
      return this.store.peekRecord('user', get(this, 'userId')).reload();
    }
  }
});
