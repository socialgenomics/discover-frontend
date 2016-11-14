import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, get, setProperties } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  resetController(controller, isExiting) {
    if (isExiting && get(controller, 'didRequest')) {
      setProperties(controller, {
        title: null,
        description: null,
        didRegister: false
      });
    }
  }
});
