import Ember from 'ember';
import QP from 'npm:../../query-parser';
import colours from 'repositive/utils/colours';
import ENV from 'repositive/config/environment';

const { Mixin, inject: { service }, get, set } = Ember;

export default Mixin.create({
  ajax: service(),
  store: service(),

  queryParams: {
    query: { refreshModel: true },
    page: { refreshModel: true },
    resultsPerPage: { refreshModel: true }
  },

  actions: {
    loading(transition, route) {
      const controller = this.controllerFor(get(route, 'routeName'));
      set(controller, 'isLoading', true);
      transition.promise.finally(() => {
        set(controller, 'isLoading', false);
      });
    }
  },

  getActiveFilters() {
    const queryTree = QP.parseString(get(this, 'query'));
    return QP.getFilters(queryTree).map(f => `${f.predicate}:${f.text}`);
  },

  isFilterActive() {
    return true;
  },

  makeRequest(params) {
    const limit = params.resultsPerPage || 9;
    const offset = (params.page - 1) * limit;
    const query = params.query || '';
    const body = query === '' ? {} : QP.parseString(query);

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
          b.colour = colours.getColour(b.key);
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
