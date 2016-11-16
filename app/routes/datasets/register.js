import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, setProperties, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  resetController(controller, isExiting) {
    if (isExiting && get(controller, 'didRegister')) {
      setProperties(controller, {
        title: null,
        description: null,
        url: null,
        didRegister: false
      });
    }
  }
});
