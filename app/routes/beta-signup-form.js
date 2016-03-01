import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  beforeModel: function(/*transition*/) {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('root');
    }
  }
});
