import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SearchRouteMixin from '../../mixins/search';

const { Route, get } = Ember;

export default Route.extend(
  AuthenticatedRouteMixin,
  SearchRouteMixin, {
    model(params) {
      return this.makeRequest(params);
    },
    afterModel(model, transition) {
      this._updateQueryServiceValue(get(transition, 'queryParams.query'));
    }
  }
);
