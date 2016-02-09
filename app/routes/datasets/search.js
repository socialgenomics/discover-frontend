import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  model: function(params) {
    return this.store.createRecord('Search', {
      queryParams: params,
      user: this.get('session.data.authenticatedUser')
    });
  }
});
