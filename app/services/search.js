import Ember from 'ember';
import ENV from 'repositive/config/environment';

const { get, inject: { service }, Service, set, Logger } = Ember;

export default Service.extend({
  ajax: service(),

  query: null, //<string>

  getQuery() { return get(this, 'query'); },

  resetQuery() { set(this, 'query', null); },

  /**
   * Updates the query property.
   * @param {(string|Object)} value - Value to be appended to query
   */
  updateQuery(value) {
    //calls _generateQueryObject or similar function from package.
    this._setQuery(value);
    this._makeRequest(get(this, 'query'));
  },

  /**
  * Adds a filter to query tree if it's not already there. Returns new tree.
  * @param {BTree} queryTree - Tree which the filter will be appended to
  * @param {Object} filter - Filter to be appended to tree e.g. { assay: 'Chip-Seq' }
  * @returns {BTree} - New binary tree representation of the query
  */
  _addFilter(queryTree, filter) {
  },

  /**
  * Removes the filter from the query tree if present. Returns new tree.
  * @param {BTree} queryTree - Tree which the filter will be removed from
  * @param {Object} filter - Filter to be removed from the tree
  * @returns {BTree} - New binary tree representation of the query
  */
  _removeFilter(queryTree, filter) {
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

  _setQuery(query) { set(this, 'query', query); },

  _makeRequest(query) {
    return get(this, 'ajax').request(ENV.APIRoutes['datasets.search'], {
      method: 'POST',
      contentType: 'application/json',
      data: query
    })
      .then(resp => {
        console.log(resp);
      })
      .catch(Logger.error);
  }
});
