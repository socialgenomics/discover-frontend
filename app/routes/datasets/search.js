import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SearchRouteMixin from '../../mixins/search';
const { get, inject: { service }, Route, set } = Ember;

export default Route.extend(AuthenticatedRouteMixin, SearchRouteMixin, {
  session: service(),

  model(params) {
    const resultsPerPage = parseInt(params.resultsPerPage, 10);

    return this.makeRequest();
  }
})
