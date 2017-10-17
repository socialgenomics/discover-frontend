import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';
import ENV from 'repositive/config/environment';

const { Mixin, inject: { service }, get, set, setProperties, computed } = Ember;

export default Mixin.create({
  ajax: service(),
  store: service(),
  queryService: service('query'),

  queryParams: {
    query: { refreshModel: true },
    page: { refreshModel: true },
    resultsPerPage: { refreshModel: true }
  },

  QP: computed(function () {
    return QP;
  }),

  actions: {
    loading(transition, route) {
      const targetRouteName = get(route, 'routeName').split('.');
      const currentPath = window.location.pathname;
      const slashesInPath = (currentPath.match(/[/]/g) || []).length;
      /*
       * If the path your are transitioning from includes the route name of the
       * target route. And there is more than one slash in the path, it must be
       * the same route. So, show in-page loading spinners rather than global spinner.
       * Please refactor if this is too hacky.
      */
      if (currentPath.includes(targetRouteName[0]) && slashesInPath > 1) {
        const controller = this.controllerFor(get(route, 'routeName'));
        set(controller, 'isLoading', true);
        transition.promise.finally(() => {
          set(controller, 'isLoading', false);
        });
      } else {
        return true; //bubble up to root loading spinner
      }
    }
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      setProperties(controller, {
        'page': 1,
        'query': ''
      })
    }
  },

  getActiveFilters() {
    const QP = get(this, 'QP');
    const queryTree = QP.fromNatural(get(this, 'query'));
    return QP.filter(queryTree, (node) => QP.isPredicate(node)).map(f => `${f.predicate}:${f.text}`);
  },

  makeRequest(params) {
    const MAX_RESULTS_PER_PAGE = 90;
    const DEFAULT_RESULTS_PER_PAGE = 30;
    const resultsPerPage = params.resultsPerPage || DEFAULT_RESULTS_PER_PAGE;
    const limit = Math.min(resultsPerPage, MAX_RESULTS_PER_PAGE);
    const offset = (params.page - 1) * limit;
    const query = params.query || '';
    const body = query === '' ? {} : get(this, 'QP').fromNatural(query);
    const requestOptions = {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ type: 'dataset', offset, limit, body })
    };

    return get(this, 'ajax')
      .request(ENV.APIRoutes['datasets.search'],requestOptions)
      .then(this._handleQueryResponse.bind(this));
  },

  /**
  * @desc Update queryService query value
  * @param {String?} queryString - The new query value
  * @private
  */
  _updateQueryServiceValue(queryString) {
    const QP = get(this, 'QP');
    const qS = get(this, 'queryService');
    if (queryString) {
      qS.setQueryTree(QP.fromNatural(queryString));
    } else {
      qS.setQueryTree(null);
    }
  },

  /**
   * @desc Process the query response from the backend
   * @param {Object} resp - Response from API
   * @returns {Object} - A transformed response w/ working filter buckets.
   * @private
   */
  _handleQueryResponse(resp) {
    const store = get(this, 'store');

    resp.datasets = resp.datasets.map(dataset => store.push(store.normalize('dataset', dataset)));
    resp.aggs = this._normalizeFilters(resp.aggs);

    return resp;
  },

  /**
   * @desc This function transforms the aggregations/filters into a more ember friendly format
   * @param {Object} aggs - The aggs found in the search response
   * @returns {Array} - The transformed filters
   * @private
   */
  _normalizeFilters(aggs) {
    return Object.keys(aggs).reduce((filters, filter) => {
      const buckets = aggs[filter].buckets;
      return [...filters, ...[{
        name: filter,
        displayName: filter.capitalize(),
        buckets: buckets
      }]]
    }, []);
  }
});
