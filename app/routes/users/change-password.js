import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, get, inject: { service } } = Ember;

export function mainCredential(credentials) {
  return credentials.filter((c) => get(c, 'primary'))[0];
}

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    const userId = get(this, 'session.session.authenticated.user.id');
    return this.store.query('credential', { 'where.user_id': userId }).then((credentials) => {
      return {
        main_credential: mainCredential(credentials)
      };
    });
  }
});
