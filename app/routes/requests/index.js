import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfiniteScrollMixin from 'repositive/mixins/infinite-scroll';

const { Route, get, set } = Ember;

export default Route.extend(AuthenticatedRouteMixin, InfiniteScrollMixin, {
  model() {
    const offset = get(this, 'offset');
    const resultsPerPage = get(this, 'resultsPerPage');
    const modelType = 'request';
    set(this, 'modelType', modelType);

    if (offset) {
      return this._makeRequest(
        modelType,
        this._buildRequestObj(0, offset)
      );
    } else {
      return this._makeRequest(
        modelType,
        this._buildRequestObj(offset, resultsPerPage)
      );
    }
  },
  actions: {
    willTransition(transition) {
      if (transition.targetName !== 'requests.detail') {
        // if we are not going to the detail of one of the requests, then we should reset the offset!
        this.resetScroll();
      }
      return transition;
    }
  }
});
