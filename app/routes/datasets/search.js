import Ember from 'ember';
import SearchRouteMixin from '../../mixins/search';

const { Route } = Ember;

export default Route.extend(
  SearchRouteMixin, {
    model(params) {
      return this.makeRequest(params)
        .then(resp => {
          this._updateQueryServiceValue(params.query);
          return resp;
        });
    }
  }
);
