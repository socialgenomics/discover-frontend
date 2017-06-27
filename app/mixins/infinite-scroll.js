import Ember from 'ember';

const { Mixin, get, set, Logger, merge } = Ember;

export default Mixin.create({
  offset: 0,
  resultsPerPage: 12,
  previousFirstResultId: null,
  allItemsLoaded: false,
  modelType: 'dataset',

  actions: {
    loadMore() {
      if (!get(this, 'allItemsLoaded')) {
        return this._loadMore(get(this, 'modelType'), get(this, 'offset'), get(this, 'resultsPerPage'));
      }
    }
  },

  /**
   * @desc requests to login to access users auth token to reset password.
   * @param {String} modelType - name of model to query
   * @param {Number} currentOffset - starting index of request
   * @param {Number} resultsPerPage - number of results requested at a time
   * @returns {Promise} the promised results
   * @private
   */
  _loadMore(modelType, currentOffset, resultsPerPage) {
    const newOffset = currentOffset + resultsPerPage;
    set(this, 'offset', newOffset);

    return this._makeRequest(
      modelType,
      this._buildRequestObj(newOffset, resultsPerPage, { 'where.user_id.$ne': 'null' }
    ))
      .then(this._handleResponse.bind(this))
      .catch(Logger.error)
  },

  /**
   * @desc pushes the new results to the model
   * @param {Object} resp - the query response data
   * @returns {Array} the objects pushed to the model
   * @private
   */
  _handleResponse(resp) {
    const model = get(this, 'controller.model');
    /**
     * Cache first result id.
     * Because we don't have the total number of results, this is necessary
     * as we need a stop condition for loadMore()
     */
    this._cacheFirstResult(get(resp, 'firstObject.id'));

    return model.pushObjects(get(resp, 'content'));
  },

  /**
   * @desc Cache first result id to use as loadMore stopping condtion check.
   * @param {String} firstResultId - id of first result
   * @private
   */
  _cacheFirstResult(firstResultId) {
    return firstResultId === get(this, 'previousFirstResultId') ?
      set(this, 'allItemsLoaded', true) :
      set(this, 'previousFirstResultId', firstResultId);
  },

  /**
   * @desc Builds a object to be used for querying purposes
   * @param {Number} currentOffset - starting index of request
   * @param {Number} resultsPerPage - number of results requested at a time
   * @param {Object} customProps - any other query arguments
   * @returns {Object} merged result of default and custom properties
   * @private
   */
  _buildRequestObj(offset, limit, customProps = {}) {
    const dataObj = {
      offset,
      limit,
      'order[0][0]': 'updated_at',
      'order[0][1]': 'DESC'
    }
    return merge(dataObj, customProps);
  },

  /**
   * @desc requests the model using a constructed query object
   * @param {String} modelName - name of the model to query for
   * @param {Object} requestObj - object containing query arguments
   * @returns {Promise} the promised data
   * @private
   */
  _makeRequest(modelName, requestObj) {
    return this.store.query(modelName, requestObj);
  }
});
