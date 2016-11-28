import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { model, resetControllerOnRouteChange } from '../datasources/source';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import ActionableMixin from 'repositive/mixins/actionable';

const { get, Route , inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, ActionableMixin, {
  session: service(),

  controllerName: 'collection',
  model: model,
  afterModel(model) {
    this._incrementViewCounter(model.collection, get(this, 'session.authenticatedUser'));
  },
  actions: {
    willTransition(transition) {
      resetControllerOnRouteChange(transition.targetName, this.routeName, this.controller);
    },
    invalidateModel: function() {
      this.controller.set('isLoading', true);
      this.refresh().promise.then(() => this.controller.set('isLoading', false));
    }
  }
});
