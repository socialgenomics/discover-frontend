import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { model } from '../datasources/source';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import ActionableMixin from 'repositive/mixins/actionable';
import SearchRouteMixin from '../../mixins/search-route';

const { get, Route , inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, ActionableMixin, SearchRouteMixin, {
  ajax: service(),
  session: service(),
  searchService: service('search'),

  controllerName: 'collection',
  // caching viewed collections to prevent multiple incrementViewCounter for single collection
  viewedCollections: [],

  model: model,

  afterModel(model) {
    const viewedCollections = get(this, 'viewedCollections');
    const collectionId = get(model, 'collection.id');
    if (viewedCollections.indexOf(collectionId) === -1) {
      this._incrementViewCounter(model.collection, get(this, 'session.authenticatedUser'));
      viewedCollections.push(collectionId);
    }
  }
});
