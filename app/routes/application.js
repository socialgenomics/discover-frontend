import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  favouritesService: service('favourites'),
  session: service(),
  afterModel() {
    const isAuthenticated = get(this, 'session').get('isAuthenticated');
    if (isAuthenticated) {
      get(this, 'favouritesService').loadFavourites();
    }
  },
  actions: {
    search: function(query) {
      this.transitionTo('datasets.search', {
        queryParams: {
          q: query,
          ordering: null,
          assay: null,
          tags: null,
          datasource: null,
          access: null
        }
      });
    },
    toggleModal() {
      this.controllerFor('application').toggleProperty('isShowingModal');
    }
  }
});
