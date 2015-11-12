import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.createRecord('Search', {
      queryParams: params,
      user: this.get('currentUser')
    });
  }
});
