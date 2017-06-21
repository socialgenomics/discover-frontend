import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { model } from '../datasources/source';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import SearchRouteMixin from '../../mixins/search';
import IncrementCollectionViewCounterMixin from '../../mixins/increment-collection-view-counter-mixin';

const { Route , inject: { service } } = Ember;

export default Route.extend(
  AuthenticatedRouteMixin,
  ResetScrollMixin,
  SearchRouteMixin,
  IncrementCollectionViewCounterMixin,
  {
    ajax: service(),
    session: service(),

    controllerName: 'collection',
    model: model,

    afterModel(model) {
      this.incrementCollectionsViewCounter(model);
    }
  }
);
