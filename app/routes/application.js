import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service }, get, RSVP } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  favouritesService: service('favourites'),
  session: service(),
  model() {
    if (get(this, 'session.isAuthenticated')) {
      RSVP.resolve(get(this, 'favouritesService').loadFavourites());
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
