import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SearchRouteMixin from '../../mixins/search-route';
const { get, inject: { service }, Route, set } = Ember;

export default Route.extend(AuthenticatedRouteMixin, SearchRouteMixin, {
  session: service(),
  searchService: service('search'),

  model(params) {
    const searchService = get(this, 'searchService');
    const resultsPerPage = parseInt(params.resultsPerPage, 10);

    if (resultsPerPage > 0) {
      set(this, 'searchService.resultsPerPage', resultsPerPage);
    }

    return searchService.updateQueryAndMakeRequest(params.query, params.page);
  }
});
