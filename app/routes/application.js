import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import BT from 'npm:../../query-parser/dist/main/b-tree';
import BX from 'npm:../../query-parser/dist/main/b-exp-tree';
import QP from 'npm:../../query-parser';

const { Route, inject: { service }, get } = Ember;

const isUUID = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

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
    search(queryString, pageNumber) {
      try {
        const queryTree = QP.parseString(queryString);
        const collectionPredicate = BT.filter(queryTree, (node) => {
          return BX.isFilter(node) && node.predicate === 'collection';
        });
        const datasourcePredicate = BT.filter(queryTree, (node) => {
          return BX.isFilter(node) && node.predicate === 'datasource';
        });

        this._conditionallyTransition(collectionPredicate, datasourcePredicate, queryString, pageNumber);

        if (get(this, 'session.isAuthenticated')) {
          get(this, 'metrics').trackEvent({
            category: 'discover_homeauth_searchbar',
            action: 'query',
            label: queryString
          });
        } else {
          get(this, 'metrics').trackEvent({
            category: 'discover_openpage_searchbar',
            action: 'query',
            label: queryString
          });
        }
      } catch(error) {
        this.transitionTo(this._getErrorRouteNameFromSearchQuery(queryString));
      }
    },

    toggleModal() {
      this.controllerFor('application').toggleProperty('isShowingModal');
    },
    //Used by notification-list-item
    transitionToSubscribable(subscribableModel, subscribableId) {
      this.transitionTo(`${subscribableModel}s.detail`, subscribableId);
    }
  },

  /**
   * @desc - returns search error route name from search query for collections, datasources or datasets
   * @param {String} searchQuery
   * @returns {string} - route name
   * @private
   */
  _getErrorRouteNameFromSearchQuery(searchQuery) {
    const patternMatch = searchQuery.match(/(collection|datasource):.*/) || [];

    return `${patternMatch[1] || 'dataset'}s.search-error`;
  },

  _conditionallyTransition(collectionPredicate, datasourcePredicate, queryString, pageNumber) {
    if (collectionPredicate.length === 1 && get(this, 'controller.currentPath').indexOf('collection') !== -1) {
      this._queryAndTransition('collections.collection', collectionPredicate[0], queryString, pageNumber);
    } else if (datasourcePredicate.length === 1 && get(this, 'controller.currentPath').indexOf('datasource') !== -1) {
      this._queryAndTransition('datasources.source', datasourcePredicate[0], queryString, pageNumber);
    } else {
      this.transitionTo('datasets.search', {
        queryParams: {
          query: queryString,
          page: pageNumber || 1
        }
      });
    }
  },
  _queryAndTransition(dest, input, serializeTree, pageNumber) {
    let query = {};
    if (isUUID.test(input.text)) {
      query = { 'where.id' : input.text };
    } else {
      query = {
        'where[$or][0][name]' : input.text,
        'where[$or][1][properties][short_name]' : input.text,
        'where[$or][2][properties][short_name]' : input.text.toUpperCase()
      };
    }
    this.store.query('collection', query).then(collection => {
      this.store.push(this.store.normalize('collection', collection.content[0]));
      this.transitionTo(dest, collection.content[0].id, {
        queryParams: {
          query: serializeTree,
          page: pageNumber || 1
        }
      });
    });
  }
});
