import Ember from 'ember';
import ENV from 'repositive/config/environment';
import QP from 'npm:../../query-parser';

const { get, inject: { service }, Service, set, Logger } = Ember;

export default Service.extend({
  ajax: service(),

  queryString: null, //<String> This is the only queryParam
  queryTree: null, //<BTree>
  queryParams: [],
  offset: 0,
  resultsPerPage: 9,

  getQueryString() { return get(this, 'queryString'); },

  resetQueryString() { set(this, 'queryString', null); },

  /**
   * @desc Updates the query property and makes a request with this
   * @param {string | object} query - New query string/tree
   * @public
   */
  updateQuery(queryStringOrTree) {
    let queryTree;
    if (typeof queryStringOrTree === 'string') {
      queryTree = this._parseString(queryStringOrTree);
    } else if (typeof queryStringOrTree === 'object') {
      queryTree = queryStringOrTree;
    }
    this._setQuery(this._serializeToString(queryTree));
    return this._makeRequest(queryTree)
      .then(this._handleQueryResponse.bind(this))
      .catch(Logger.error);
  },

  /**
  * @desc Adds a predicate to query tree if it's not already there. Returns new tree.
  * @param {BTree} queryTree - Tree which the predicate will be appended to
  * @param {Object} predicate - Predicate to be appended to tree e.g. { assay: 'Chip-Seq' }
  * @returns {BTree} - New binary tree representation of the query
  * @public
  */
  addPredicate(predicate) {
    // Can get the query tree from the service (get(this, 'queryTree'));
    // So we don't need to pass in query tree
    const queryTree = (get(this, 'queryTree'));
    //moduleMethod addPredicate(queryTree, predictate);
    // this._updateQuery(addPredicate(queryTree, predictate));
  },

  /**
  * @desc Removes the predicate from the query tree if present. Returns new tree.
  * @param {BTree} queryTree - Tree which the predicate will be removed from
  * @param {Object} predicate - Predicate to be removed from the tree
  * @returns {BTree} - New binary tree representation of the query
  * @public
  */
  removePredicate(queryTree, predicate) {
  },

  /**
  * @desc Converts query String to BTree.
  * @param {string} query - query to be parsed
  * @returns {BTree} - New binary tree representation of the query
  * @private
  */
  _parseString(queryString) {
    return QP.parseString(queryString);
  },

  /**
  * @desc Converts query BTree to String.
  * @param {BTree} query - query to be serialized into string
  * @returns {string} - New string representation of the query
  * @private
  */
  _serializeToString(queryTree) {
    return QP.toBoolString(queryTree);
  },

  /**
  * @desc Sets the query property to the string provided
  * @param {string} queryString - string to be set as the service's query property
  * @private
  */
  _setQuery(queryString) { set(this, 'queryString', queryString); },

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

  _handleQueryResponse(results) {
    console.log(results);
    return results;
    //load the datasets into the model
    //pagination?
  }
});
