import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SearchRouteMixin from '../../mixins/search-route';
const { get, inject: { service }, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, SearchRouteMixin, {
  session: service(),
  searchService: service('search'),

  model(params) {
    const searchService = get(this, 'searchService');
    return searchService.updateQueryAndMakeRequest(params.query || '', params.page || 1);
  }
});
