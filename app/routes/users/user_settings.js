import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  model: function() {
    return this.store.queryRecord('user_settings', { UserId: this.get('session.data.authenticatedUser.id') });
  }
});
