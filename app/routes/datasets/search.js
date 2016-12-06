import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { get, inject: { service }, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  searchService: service('search'),

  model: function(params) {
    console.log(params);
    const searchService = get(this, 'searchService');
    return searchService.updateQuery(params.query);
  }
});
