import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  favouritesService: service('favourites'),
  session: service(),
  urlGenerator: service(),

  init() {
    this._super(...arguments);
    // do not remove this initialization. It's required for the url generator service to work properly
    get(this, 'urlGenerator').initialize(this.router);
  },

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
          page: pageNumber || 1
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
