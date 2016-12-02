import Ember from 'ember';
import ENV from 'repositive/config/environment';

const { get, inject: { service }, Service, set, Logger } = Ember;

export default Service.extend({
  ajax: service(),

  query: null, //<string>

  getQuery() { return get(this, 'query'); },

  resetQuery() { set(this, 'query', null); },

  /**
   * Updates the query property and makes a request with this
   * @param {string} query - New query string
   */
  updateQuery(query) {
    const queryTree = this._parseString(query);
    this._setQuery(this._serializeToString(queryTree));
    this._makeRequest(queryTree)
      .then(this._handleResponse.bind(this))
      .catch(Logger.error);
  },

  /**
  * Adds a predicate to query tree if it's not already there. Returns new tree.
  * @param {BTree} queryTree - Tree which the predicate will be appended to
  * @param {Object} predicate - Predicate to be appended to tree e.g. { assay: 'Chip-Seq' }
  * @returns {BTree} - New binary tree representation of the query
  */
  _addPredicate(queryTree, predicate) {
  },

  /**
  * Removes the predicate from the query tree if present. Returns new tree.
  * @param {BTree} queryTree - Tree which the predicate will be removed from
  * @param {Object} predicate - Predicate to be removed from the tree
  * @returns {BTree} - New binary tree representation of the query
  */
  _removePredicate(queryTree, predicate) {
  },

  /**
  * Converts query String to BTree.
  * @param {string} query - query to be parsed
  * @returns {BTree} - New binary tree representation of the query
  */
  _parseString(queryString) {
  },

  /**
  * Converts query BTree to String.
  * @param {BTree} query - query to be serialized into string
  * @returns {string} - New string representation of the query
  */
  _serializeToString(queryTree) {
  },

  /**
  * Sets the query property to the string provided
  * @param {string} queryString - string to be set as the service's query property
  */
  _setQuery(queryString) { set(this, 'query', queryString); },

  /**
  * Sets the query property to the string provided
  * @param {BTree} queryTree - query tree sent with POST request
  * @returns {Promise} - The promised data
  */
  _makeRequest(queryTree) {
    return get(this, 'ajax').request(ENV.APIRoutes['datasets.search'], {
      method: 'POST',
      contentType: 'application/json',
      data: queryTree
    });
  }
});
