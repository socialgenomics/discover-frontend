import Ember from 'ember';
import ENV from 'repositive/config/environment';
import QP from 'npm:../../query-parser';
import colours from 'repositive/utils/colours';

const { get, inject: { service }, Service, set, Logger } = Ember;

export default Service.extend({
  ajax: service(),
  store: service(),

  queryString: null, //<String> This is the only queryParam
  queryTree: null, //<BTree>
  offset: 0,
  resultsPerPage: 9,

  getQueryString() { return get(this, 'queryString'); },

  /**
   * @desc Updates the query property and makes a request with this
   * @public
   * @param queryStringOrTree
   */
  updateQuery(queryStringOrTree, pageNumber) {
    let queryTree;
    if (typeof queryStringOrTree === 'string') {
      queryTree = this._parseString(queryStringOrTree);
    } else if (typeof queryStringOrTree === 'object') {
      queryTree = queryStringOrTree;
    }
    this._setQueryString(this._serializeToString(queryTree));
    this._setQueryTree(queryTree);
    this._setOffsetFromPageNumber(pageNumber);
    return this._makeRequest(queryTree)
      .then(this._handleQueryResponse.bind(this))
      .catch(Logger.error);
  },

  /**
  * @desc Adds a predicate to query tree if it's not already there. Returns new tree.
  * @param {string} predicate - Predicate if filter to be added to tree e.g. 'assay'
  * @param {string} text - The text of the filter to be added e.g. 'Chip-Seq'
  * @public
  */
  addPredicate(predicate, text) {
    const queryTree = (get(this, 'queryTree'));
    this.updateQuery(QP.addFilter(queryTree, predicate, text));
  },

  /**
  * @desc Removes the predicate from the query tree if present. Returns new tree.
  * @param {string} predicate - Predicate/Type of filter to be removed from the tree
  * @param {string} text - Specific text of filter to be removed
  * @public
  */
  removePredicate(predicate, text) {
    const queryTree = (get(this, 'queryTree'));
    this.updateQuery(QP.removeFilter(queryTree, predicate, text));
  },

  _setOffsetFromPageNumber(pageNumber) {
    set(this, 'offset', pageNumber * get(this, 'resultsPerPage'));
  },

  /**
   * @desc Converts query String to BTree.
   * @returns {BTree} - New binary tree representation of the query
   * @private
   * @param {string} queryString - Query to be parsed.
   */
  _parseString(queryString) {
    return QP.parseString(queryString);
  },

  /**
   * @desc Converts query BTree to String.
   * @returns {string} - New string representation of the query
   * @private
   * @param {BTree} queryTree - Tree to be serialized.
   */
  _serializeToString(queryTree) {
    return QP.toBoolString(queryTree);
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
  * @desc Sets the query property to the string provided
  * @param {BTree} queryTree - query tree sent with POST request
  * @returns {Promise} - The promised data
  * @private
  */
  _makeRequest(queryTree) {
    return get(this, 'ajax').request(ENV.APIRoutes['datasets.search'], {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        'type': 'dataset',
        'offset': get(this, 'offset'),
        'limit': get(this, 'resultsPerPage'),
        'body': queryTree
      })
    });
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
          displayName: filter.charAt(0).toUpperCase() + filter.slice(1),
          buckets: buckets
        });
      }
    }
    return filters;
  },

  /**
   * @desc Process the query response from the backend
   * @param {Object} resp - Response from API
   * @returns {Object} - A transformed response w/ working filter buckets.
   * @private
   */
  _handleQueryResponse(resp) {
    const store = get(this, 'store');
    resp.datasets.map(dataset => store.push(store.normalize('dataset', dataset)));
    resp.aggs = this._normalizeFilters(resp.aggs);
    return resp;
  }
});
