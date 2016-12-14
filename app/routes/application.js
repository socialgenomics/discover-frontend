import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import BT from 'npm:../../query-parser/dist/main/b-tree';
import BX from 'npm:../../query-parser/dist/main/b-exp-tree';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  favouritesService: service('favourites'),
  session: service(),
  searchService: service('search'),
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
    search(queryTree, pageNumber) {
      const searchService = get(this,  'searchService');
      const collectionF = BT.filter(queryTree, (node, left, right) => {
        return BX.isFilter(node) && node.predicate === 'collection'
      });
      const datasourceF = BT.filter(queryTree, (node, left, right) => {
        return BX.isFilter(node) && node.predicate === 'datasource'
      });
      const serializeTree = searchService.serializeToString(queryTree);
      if (collectionF.length === 1) {
        this.transitionTo('collections.collection', collectionF[0].text, {
          queryParams: {
            query: serializeTree,
            page: pageNumber || 1
          }
        });
      } else if (datasourceF.length === 1) {
        this.transitionTo('datasources.source', datasourceF[0].text, {
          queryParams: {
            query: serializeTree,
            page: pageNumber || 1
          }
        });
      } else {
        this.transitionTo('datasets.search', {
          queryParams: {
            query: serializeTree,
            page: pageNumber || 1
          }
        });
      }
      get(this, 'metrics').trackEvent({
        category: 'search',
        action: 'query',
        label: serializeTree
      });
    },
    toggleModal() {
      this.controllerFor('application').toggleProperty('isShowingModal');
    }
  }
});
