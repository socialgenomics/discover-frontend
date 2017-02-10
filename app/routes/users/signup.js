import Ember from 'ember';
import ThirdParty from 'repositive/mixins/third-party-route-mixin';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route, inject:{ service } } = Ember;

export default Route.extend(ThirdParty, UnauthenticatedRouteMixin, {
  session: service()
});
