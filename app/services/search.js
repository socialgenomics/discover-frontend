import Ember from 'ember';
import ENV from 'repositive/config/environment';
import QP from 'npm:../../query-parser';

const { get, inject: { service }, Service, set, Logger } = Ember;

export default Service.extend({
  ajax: service(),
  store: service(),

  queryString: null, //<String> This is the only queryParam
  queryTree: null, //<BTree>
  offset: 0,
  resultsPerPage: 9,

  getQueryString() { return get(this, 'queryString'); },

  resetQueryString() { set(this, 'queryString', null); },

  /**
   * @desc Updates the query property and makes a request with this
   * @public
   * @param queryStringOrTree
   */
  updateQuery(queryStringOrTree) {
    let queryTree;
    if (typeof queryStringOrTree === 'string') {
      queryTree = this._parseString(queryStringOrTree);
    } else if (typeof queryStringOrTree === 'object') {
      queryTree = queryStringOrTree;
    }
    this._setQueryString(this._serializeToString(queryTree));
    this._setQueryTree(queryTree);
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
    // Can get the query tree from the service (get(this, 'queryTree'));
    // So we don't need to pass in query tree
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
    this._updateQuery(QP.removeFilter(queryTree, predicate, text));
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

  _handleQueryResponse(resp) {
    const store = get(this, 'store');
    resp.datasets.map(dataset => store.push(store.normalize('dataset', dataset)));
    return resp;
  }
});
