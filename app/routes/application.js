import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  favouritesService: service('favourites'),
  session: service(),

  sessionAuthenticated() {
    this._super(...arguments);
    get(this, 'favouritesService').loadFavourites();
  },
  model() {
    get(this, 'favouritesService').loadFavourites();
  },
  actions: {
    search(query, pageNumber) {
      this.transitionTo('datasets.search', {
        queryParams: {
          query: query,
          page: pageNumber
        }
      });
      get(this, 'metrics').trackEvent({
        category: 'search',
        action: 'query',
        label: query
      });
    },
    toggleModal() {
      this.controllerFor('application').toggleProperty('isShowingModal');
    }
  }
});
