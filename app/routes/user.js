import Ember from 'ember';
import { isVerified } from './users/trust';
import ENV from 'repositive/config/environment';

const { inject: { service }, Route, RSVP, get, set, Logger } = Ember;

export default Route.extend({
  ajax: service(),
  session: service(),
  favouritesService: service('favourites'),

  model: function(params) {
    if (get(this, 'session.session.isAuthenticated')) {
      return this.store.findRecord('user', params.id)
      .then(user => {
        const userId = get(user, 'id');
        // TODO: The majority of this info can be cached and retrieved from the same session instead of doing unnecesary calls.
        return new RSVP.hash({
          user: user,
          user_profile: this.store.query('userProfile', { 'where.user_id': userId }),
          registrations: this.store.query('dataset', { 'where.user_id': userId }),
          requests: this.store.query('request', { 'where.user_id': userId }),
          user_credential: this.store.query('credential', { 'where.user_id': userId }),
          favourited_data: this._getFavouritedData(params.id),
          user_comments: this.store.query('action', { 'where.user_id': userId, 'where.type': 'comment' })
        });
      })
      .then(values => {
        const numberOfComments = values.user_comments.get('content').length;
        this.controllerFor('user.index').setProperties({
          favouritedData: values.favourited_data,
          numberOfComments: numberOfComments,
          numberOfFavourites: values.favourited_data.length
        });
        return {
          user: values.user,
          user_profile: values.user_profile.get('firstObject'),
          registrations: values.registrations,
          requests: values.requests,
          is_verified: isVerified(values.user_credential)
        };
      })
      .catch(err => {
        Logger.error(err);
        if (err.errors[0].status === 500) {
          throw err;
        }
      });
    } else {
      this.transitionTo('/');
    }
  },
  _getFavouritedData(userIdOfProfile) {
    const ajax = get(this, 'ajax');
    return RSVP.hash({
      datasets: ajax.request(ENV.APIRoutes['favourite-datasets'].replace('{user_id}', userIdOfProfile), { method: 'GET' }),
      requests: ajax.request(ENV.APIRoutes['favourite-requests'].replace('{user_id}', userIdOfProfile), { method: 'GET' })
    })
      .then(data => {
        const datasets = data.datasets.map(dataset => this._setModelType(dataset, 'dataset'));
        const requests = data.requests.map(request => this._setModelType(request, 'request'));
        const allFavourites = datasets.concat(requests);
        return allFavourites;
      })
      .catch(Logger.error);
  },

  _setModelType(model, modelType) {
    set(model, 'type', modelType);
    return model;
  }
});
