import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { model } from '../datasources/source';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';

const { Route , inject: { service }, get, Logger } = Ember;

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  session: service(),

  controllerName: 'collection',
  model: model,
  afterModel(model) {
    this._incrementViewCounter(model.collection);
  },
  _incrementViewCounter(model) {
    const userId = get(this, 'session.authenticatedUser');
    if (userId) {
      this.store.createRecord('action', {
        userId,
        actionableId: get(model, 'actionableId'),
        type: 'view',
        actionable_model: model.constructor.modelName
      })
      .save().catch(Logger.error);
    }
  },
  actions: {
    invalidateModel: function() {
      this.controller.set('isLoading', true);
      this.refresh().promise.then(() => this.controller.set('isLoading', false));
    }
  }
});
