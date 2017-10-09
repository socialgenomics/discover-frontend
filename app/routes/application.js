import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import QP from 'npm:@repositive/query-parser';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  favouritesService: service('favourites'),
  session: service(),
  ajax: service(),
  urlGenerator: service(),

  model() {
    get(this, 'favouritesService').loadFavourites();
  },

  init() {
    this._super(...arguments);
    // do not remove this initialization. It's required for the url generator service to work properly
    get(this, 'urlGenerator').initialize(this.router);
  },

  actions: {
    search(queryString = '', pageNumber) {
      try {
        const queryTree = QP.fromNatural(queryString);
        const collectionPredicate = QP.filter(queryTree, (node) => {
          return QP.isPredicate(node) && node.key === 'collection';
        });
        const datasourcePredicate = QP.filter(queryTree, (node) => {
          return QP.isPredicate(node) && node.key === 'datasource';
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
      } catch (error) {
        this.transitionTo(this._getErrorRouteNameFromSearchQuery(queryString));
      }
    },

    // Used by notification-list-item
    transitionToSubscribable(subscribableModel, subscribableId) {
      this.transitionTo(`${subscribableModel}s.detail`, subscribableId);
    },

    // Used by change-password-form
    transitionToProfile() {
      this.transitionTo('users.profile');
    }
  },

  sessionAuthenticated() {
    this._super(...arguments);
    get(this, 'favouritesService').loadFavourites();
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
      debugger;
      this.transitionTo('datasets.search', {
        queryParams: {
          query: queryString,
          page: pageNumber || 1
        }
      });
    }
  },

  _queryAndTransition(dest, input, serializeTree, pageNumber) {
    const collection = dest === 'datasources.source' ?
      QP.filter(input, n => n.key === 'datasource')[0] :
      QP.filter(input, n => n.key === 'collection')[0]
    const query = {
      'where[$or][0][name]': collection.value,
      'where[$or][1][properties][short_name]': collection.value,
      'where[$or][2][properties][short_name]': collection.value.toUpperCase()
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
