import Ember from 'ember';

const { Mixin, get, set, Logger, merge } = Ember;

export default Mixin.create({
  offset: 0,
  resultsPerPage: 12,
  previousFirstResultId: null,
  allItemsLoaded: false,

  actions: {
    loadMore() {
      if (!get(this, 'allItemsLoaded')) {
        return this._loadMore(get(this, 'offset'), get(this, 'resultsPerPage'));
      }
    }
  },

  _loadMore(currentOffset, resultsPerPage) {
    const newOffset = currentOffset + resultsPerPage;
    set(this, 'offset', newOffset);

    return this._makeRequest(
      'dataset',
      this._buildRequestObj(newOffset, resultsPerPage, { 'where.user_id.$ne': 'null' }
    ))
      .then(this._handleResponse.bind(this))
      .catch(Logger.error)
  },

  _handleResponse(resp) {
    const model = get(this, 'controller.model');
    /**
     * Cache first result id.
     * Because we don't have the total number of results, this is necessary
     * as we need a stop condition for loadMore()
     */
    const firstResultId = get(resp, 'firstObject.id');
    firstResultId === get(this, 'previousFirstResultId') ?
      set(this, 'allItemsLoaded', true) :
      set(this, 'previousFirstResultId', firstResultId);

    return model.pushObjects(get(resp, 'content'));
  },

  _buildRequestObj(offset, limit, customProps = {}) {
    const dataObj = {
      offset,
      limit,
      'order[0][0]': 'updated_at',
      'order[0][1]': 'DESC'
    }
    return merge(dataObj, customProps);
  },

  _makeRequest(modelName, requestObj) {
    return this.store.query(modelName, requestObj);
  }
});
