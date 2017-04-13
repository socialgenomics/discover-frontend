import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import creds from '../../utils/credentials';

const { Route, get, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    const userId = get(this, 'session.session.authenticated.user.id');
    return this.store.query('credential', { 'where.user_id': userId }).then((credentials) => {
      return {
        main_credential: creds.mainCredential(credentials)
      };
    });
  }
});
