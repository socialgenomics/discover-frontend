import Ember from 'ember';
import QP from 'npm:../../query-parser';
import colours from 'repositive/utils/colours';
import ENV from 'repositive/config/environment';

const { Mixin, inject: { service }, get, set, computed } = Ember;

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

  getColour: computed(function () {
    return colours.getColour;
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
    if (isExiting) { controller.set('query', ''); }
  },

  getActiveFilters() {
    const queryTree = get(this, 'QP').parseString(get(this, 'query'));

    return get(this, 'QP').getFilters(queryTree).map(f => `${f.predicate}:${f.text}`);
  },

  makeRequest(params) {
    const limit = params.resultsPerPage || 9;
    const offset = (params.page - 1) * limit;
    const query = params.query || '';
    const body = query === '' ? {} : get(this, 'QP').parseString(query);

    return get(this, 'ajax').request(
      ENV.APIRoutes['datasets.search'],
      {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ type: 'dataset', offset, limit, body })
      }
    ).then(this._handleQueryResponse.bind(this));
  },

  /**
  * @desc Update queryService query value
  * @param {String} query - The new query value
  * @private
  */
  _updateQueryServiceValue(query) {
    if (query) {
      get(this, 'queryService').setQueryString(get(this, 'QP').toBoolString(get(this, 'QP').parseString(query)));
    } else {
      get(this, 'queryService').setQueryString(null);
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
    const filters = [];

    for (const filter in aggs) {
      if (aggs.hasOwnProperty(filter)) {
        const buckets = aggs[filter].buckets;

        buckets.forEach(b => {
          b.colour = get(this, 'getColour')(b.key);

          return b;
        });

        filters.push({
          name: filter,
          displayName: filter.capitalize(),
          buckets: buckets
        });
      }
    }

    return filters;
  }
});
