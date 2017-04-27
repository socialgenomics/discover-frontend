import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import creds from '../../utils/credentials';

const { computed, get, inject: { service }, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  userId: computed.alias('session.data.authenticated.user.id'),

  model() {
    return this.store.findRecord('user', get(this, 'userId'));
  },

  actions: {
    reloadModel() {
      return this.store.peekRecord('user', get(this, 'userId')).reload();
    }
  }
});
