import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import BT from 'npm:../../query-parser/dist/main/b-tree';
import BX from 'npm:../../query-parser/dist/main/b-exp-tree';

const { Route, inject: { service }, get } = Ember;

const re = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

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

      const transition = (dest, input) => {
        let query = {};
        if (re.test(input.text))
          query = {'where.id' : input.text };
        else
          query = {
            'where[$or][0][name]' : input.text,
            'where[$or][1][properties][short_name]' : input.text,
            'where[$or][2][properties][short_name]' : input.text.toUpperCase()
          };
        this.store.query('collection', query).then(c => {
          this.store.push(this.store.normalize('collection', c.content[0]));
          this.transitionTo(dest, c.content[0].id, {
            queryParams: {
              query: serializeTree,
              page: pageNumber || 1
            }
          });
        });
      };

      if (collectionF.length === 1) {
        transition('collections.collection', collectionF[0]);
      } else if (datasourceF.length === 1) {
        transition('datasources.source', datasourceF[0]);
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
