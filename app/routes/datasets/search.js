import Ember from 'ember';
import SearchRouteMixin from 'repositive/mixins/search';
const { Route, inject: { service }, get } = Ember;

export default Route.extend(SearchRouteMixin, {
  favouritesService: service('favourites'),
  model(params) {
    get(this, 'favouritesService').refreshFavourites();
    return this.makeRequest(params)
      .then(resp => {
        this._updateQueryServiceValue(params.query);
        return resp;
      });
  }
});
