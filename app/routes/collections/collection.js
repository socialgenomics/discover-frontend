import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { model } from '../datasources/source';
const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  controllerName: 'collection',
  model: model,
  setupController(controller, models) {
    this._super(controller, models);
    controller.set('isLoading', false);
  },
  actions: {
    invalidateModel: function() {
      this.controller.set('isLoading', true);
      this.refresh().promise.then(() => this.controller.set('isLoading', false));
    }
  }
});
