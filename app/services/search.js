import Ember from 'ember';
import ENV from 'repositive/config/environment';
import QP from 'npm:../../query-parser';
import colours from 'repositive/utils/colours';

const { get, inject: { service }, Service, set, Logger } = Ember;

export default Service.extend({
  ajax: service(),
  store: service(),

  queryString: null,
  queryTree: null,
  offset: 0,
  resultsPerPage: 9,

  getQueryString() {
    return this.serializeToString(get(this, 'queryTree'));
  },

  getQueryTree() {
    return get(this, 'queryTree');
  },

  /**
  * @desc Adds a predicate to query tree if it's not already there.
  * @param {string} predicate - Predicate if filter to be added to tree e.g. 'assay'
  * @param {string} text - The text of the filter to be added e.g. 'Chip-Seq'
  * @returns {Tree} - The new queryTree
  * @public
  */
  addFilter(predicate, text) {
    const queryTree = (get(this, 'queryTree'));
    return QP.addFilter(queryTree, predicate, text);
  },

  /**
  * @desc Removes the predicate from the query tree if present
  * @param {string} predicate - Predicate/Type of filter to be removed from the tree
  * @param {string} text - Specific text of filter to be removed
  * @returns {Tree} - The new queryTree
  * @public
  */
  removeFilter(predicate, text) {
    const queryTree = (get(this, 'queryTree'));
    return QP.removeFilter(queryTree, predicate, text);
  },

  /**
   * @desc Checks if a 'predicate:term' filter string is currently on the query (Active filter test)
   * @param filterString
   * @returns {boolean}
   */
  isFilterActive(filterString) {
    return this._getActiveFilters().indexOf(filterString) > -1;
  },

  /**
   * @desc Updates the query property and makes a request with this
   * @param {string|Object} queryStringOrTree - The new query value
   * @param {number} pageNumber - The number of the page to fetch
   * @public
   */
  updateQueryAndMakeRequest(queryStringOrTree, pageNumber) {
    return this.makeRequest(this.updateQuery(queryStringOrTree, pageNumber));
  },

  /**
   * @desc Updates the queryString and queryTree
   * @param {string|Object} queryStringOrTree - The new query value
   * @param {number} pageNumber - The number of the page to fetch
   * @returns {Object} - the new queryTree
   * @private
   */
  updateQuery(queryStringOrTree, pageNumber) {
    let queryTree;
    if (typeof queryStringOrTree === 'string') {
      queryTree = this._parseString(queryStringOrTree);
    } else if (typeof queryStringOrTree === 'object') {
      queryTree = queryStringOrTree;
    }
    this._setQueryString(this.serializeToString(queryTree));
    this._setQueryTree(queryTree);
    this._setOffsetFromPageNumber(pageNumber);
    this._setActiveFilters(QP.getFilters(queryTree).map(f => `${f.predicate}:${f.text}`));
    return queryTree;
  },

  /**
  * @desc Makes an ajax request using the queryTree, offset and resultsPerPage
  * @param {BTree} queryTree - query tree sent with POST request
  * @returns {Promise} - The promised data
  * @private
  */
  makeRequest(queryTree) {
    return get(this, 'ajax').request(ENV.APIRoutes['datasets.search'], {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        'type': 'dataset',
        'offset': get(this, 'offset'),
        'limit': get(this, 'resultsPerPage'),
        'body': queryTree
      })
    }).then(this._handleQueryResponse.bind(this))
      .catch(Logger.error);
  },
  /**
   * @desc Converts query BTree to String.
   * @param {BTree} queryTree - Tree to be serialized.
   * @returns {string} - New string representation of the query
   * @public
   */
  serializeToString(queryTree) {
    return QP.toBoolString(queryTree);
  },

  /**
   * @desc Converts query String to BTree.
   * @param {string} queryString - Query to be parsed.
   * @returns {BTree} - New binary tree representation of the query
   * @private
   */
  _parseString(queryString) {
    return QP.parseString(queryString);
  },

  /**
  * @desc Sets the queryString property to the string provided
  * @param {string} queryString - string to be set as the service's query property
  * @private
  */
  _setQueryString(queryString) { set(this, 'queryString', queryString); },

  /**
   * @desc Sets the queryTree to the tree provided
   * @param {BTree} queryTree
   * @private
   */
  _setQueryTree(queryTree) { set(this, 'queryTree', queryTree); },

  /**
   * @desc Set the list of filters currently on the query
   * @param filters - An array of 'predicate:term' strings
   * @private
   */
  _setActiveFilters(filters) { set(this, 'activeFilters', filters); },

  /**
   * @desc Returns list of filters on current tree
   * @returns {Array} - An array of 'predicate:term' strings
   * @private
   */
  _getActiveFilters() { return get(this, 'activeFilters'); },

  /**
   * @desc Sets the service's offset value from a passed in page number
   * @param {number} pageNumber - Page number to convert to offset value
   * @private
   */
  _setOffsetFromPageNumber(pageNumber) {
    set(this, 'offset', (pageNumber - 1) * get(this, 'resultsPerPage'));
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
