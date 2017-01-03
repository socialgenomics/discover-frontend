import Ember from 'ember';
import QP from 'npm:../../query-parser';
import colours from 'repositive/utils/colours';
import ENV from 'repositive/config/environment';

const { Mixin, Logger, inject: { service }, get, set } = Ember;

export default Mixin.create({
  ajax: service(),
  store: service(),

  queryParams: {
    query: { refreshModel: true },
    page: { refreshModel: true },
    resultsPerPage: { refreshModel: true }
  },

  query: null,
  page: 1,
  resultsPerPage: 6,

  actions: {
    addFilter(predicate, text) {
      const queryTree = QP.parseString(get(this, 'query'));
      const withFilter = QP.addFilter(queryTree, predicate, text);
      debugger;
      set(this, 'query', QP.toBoolString(withFilter));
    },

    removeFilter(predicate, text) {
      const queryTree = QP.parseString(get(this, 'query'));
      const withoutFilter = QP.removeFilter(queryTree, predicate, text);
      set(this, 'query', QP.toBoolString(withoutFilter));
    }
  },

  getActiveFilters() {
    const queryTree = QP.parseString(get(this, 'query'));
    return QP.getFilters(queryTree).map(f => `${f.predicate}:${f.text}`);
  },

  isFilterActive() {
    return true;
  },

  makeRequest() {
    const results = get(this, 'resultsPerPage');
    const offset = (get(this, 'page') - 1) * results;
    const query = get(this, 'query') || '';
    const queryTree = query === '' ? {} : QP.parseString(query);

    return get(this, 'ajax').request(ENV.APIRoutes['datasets.search'], {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        type: 'dataset',
        offset: offset,
        limit: results,
        body: queryTree
      })
    }).then(this._handleQueryResponse.bind(this))
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
