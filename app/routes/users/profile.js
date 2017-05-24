import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import creds from '../../utils/credentials';

const { computed, get, inject: { service }, Route, RSVP, Logger } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  userId: computed.alias('session.data.authenticated.user.id'),

  model() {
    return RSVP.hash({
      user: this.store.findRecord('user', get(this, 'userId')),
      credentials: this.store.query('credential', {
        'where.user_id': get(this, 'userId'),
        'order[0][0]': 'updated_at',
        'order[0][1]': 'DESC',
        'limit': '50'
      })
        .then(credentials => {
          return {
            is_verified: creds.isVerified(credentials),
            main_credential: creds.mainCredential(credentials),
            secondary_credentials: creds.secondaryCredentials(credentials)
          };
        })
        .catch(Logger.error)
    });
  },

  actions: {
    reloadModel() {
      return this.store.peekRecord('user', get(this, 'userId')).reload();
    },
    pushToSecondaryCreds(newCredential) {
      const model = this.controller.model;
      model.credentials.secondary_credentials.addObject(newCredential);
    }
  }
});
