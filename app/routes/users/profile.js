import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { get, inject: { service }, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    return this.store.findRecord('user', get(this, 'session.data.authenticated.user.id'));
  }
});
