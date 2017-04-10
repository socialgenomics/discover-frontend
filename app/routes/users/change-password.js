import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, get, computed, inject: { service } } = Ember;

export function isVerified(credentials) {
  return credentials.reduce((acc, curr) => acc || get(curr, 'verified'), false);
}

export function mainCredential(credentials) {
  return credentials.filter((c) => get(c, 'primary'))[0];
}

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model: function() {
    const userId = get(this, 'session.session.authenticated.user.id');
    return this.store.query('credential', { 'where.user_id': userId }).then((credentials) => {
      return {
        is_verified: isVerified(credentials),
        main_credential: mainCredential(credentials)
      };
    });
  }
});
