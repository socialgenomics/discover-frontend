import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, get, set, Logger, merge } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  offset: 0,
  resultsPerPage: 12,

  model() {
    const offset = get(this, 'offset');
    const resultsPerPage = get(this, 'resultsPerPage');

    return this._makeRequest(
      'dataset',
      this._buildRequestObj(offset, resultsPerPage, { 'where.user_id.$ne': 'null' }
    ));
  },

  actions: {
    loadMore() {
      //should be conditional!!!
      //only load more if there are more to load
      return this._loadMore(get(this, 'offset'), get(this, 'resultsPerPage'));
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
