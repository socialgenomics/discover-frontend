import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfiniteScrollMixin from 'repositive/mixins/infinite-scroll';

const { Route, get, set } = Ember;

export default Route.extend(AuthenticatedRouteMixin, InfiniteScrollMixin, {
  model() {
    const offset = get(this, 'offset');
    const resultsPerPage = get(this, 'resultsPerPage');
    const modelType = 'dataset';
    set(this, 'modelType', modelType);

    return this._makeRequest(
      modelType,
      this._buildRequestObj(offset, resultsPerPage, { 'where.user_id.$ne': 'null' })
    );
  }
});
