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
    search(query) {
      get(this, 'metrics').trackEvent({
        category: 'search',
        action: 'query',
        label: query
      });
      this.transitionTo('datasets.search', {
        queryParams: {
          query: query
        }
        // queryParams: {
        //   q: query,
        //   ordering: null,
        //   assay: null,
        //   tags: null,
        //   datasource: null,
        //   access: null
        // }
      });
    },
    toggleModal() {
      this.controllerFor('application').toggleProperty('isShowingModal');
    }
  }
});
