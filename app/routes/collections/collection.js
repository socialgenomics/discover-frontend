import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { model } from '../datasources/source';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import ActionableMixin from 'repositive/mixins/actionable';

const { get, set, Route , inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, ActionableMixin, {
  session: service(),
  ajax: service(),
  controllerName: 'collection',
  // caching viewed collections to prevent multiple incrementViewCounter for single collection
  viewedCollections: [],

  model: model,

  afterModel(model) {
    const viewedCollections = get(this, 'viewedCollections');
    const collectionId = get(model, 'collection.actionableId.id');

    if (viewedCollections.indexOf(collectionId) === -1) {
      this._incrementViewCounter(model.collection, get(this, 'session.authenticatedUser'));
      viewedCollections.push(collectionId);
    }
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      set(controller, 'page', 1);
    }
  },

  actions: {
    invalidateModel() {
      this.controller.set('isLoading', true);
      this.refresh().promise.then(() => this.controller.set('isLoading', false));
    }
  }
});
