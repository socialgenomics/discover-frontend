import Ember from 'ember';
import ThirdParty from 'repositive/mixins/third-party-route-mixin';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(ThirdParty, UnauthenticatedRouteMixin, {
  session: Ember.inject.service()
});
