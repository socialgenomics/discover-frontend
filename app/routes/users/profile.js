import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import creds from '../../utils/credentials';

const { computed, get, inject: { service }, Route, RSVP } = Ember;

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
          is_verified: creds.isVerified(credentials),
          main_credential: creds.mainCredential(credentials),
          all_credentials: creds.allCredentials(credentials)
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
