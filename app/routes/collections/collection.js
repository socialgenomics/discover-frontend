import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { model } from '../datasources/source';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
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
