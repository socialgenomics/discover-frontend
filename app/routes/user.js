import Ember from 'ember';
import { isVerified } from './users/trust';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

const { inject: { service }, Route, RSVP } = Ember;

export default Route.extend({
  session: service(),
  favouritesService: service('favourites'),

  model: function(params) {
    if (this.get('session.session.isAuthenticated') === true) {
      return this.store.findRecord('user', params.id)
      .then(user => {
        const userId = user.get('id');
        // TODO: The majority of this info can be cached and retrieved from the same session instead of doing unnecesary calls.
        return new RSVP.hash({
          user: user,
          user_profile: this.store.query('userProfile', { 'where.user_id': userId }),
          registrations: this.store.query('dataset', { 'where.user_id': userId }),
          requests: this.store.query('request', { 'where.user_id': userId }),
          user_credential: this.store.query('credential', { 'where.user_id': userId }),
          user_favourites: this.get('favouritesService').loadFavourites(),
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
        Ember.Logger.error(err);
      });
    } else {
      this.transitionTo('/');
    }
  },
  _getFavouritedData(userIdOfProfile) {
    let token = this.get('session.session.content.authenticated.token');
    let authHeaders = {
      authorization: `JWT ${token}`
    };
    return RSVP.hash({
      datasets: ajax({ url: ENV.APIRoutes['favourite-datasets'].replace('{user_id}', userIdOfProfile),
        type: 'GET',
        headers: authHeaders
      }),
      requests: ajax({ url: ENV.APIRoutes['favourite-requests'].replace('{user_id}', userIdOfProfile),
        type: 'GET',
        headers: authHeaders
      })
    })
    .then(data => {
      let datasets = data.datasets.map(dataset => {
        dataset.type = 'dataset';
        return dataset;
      });
      let requests = data.requests.map(request => {
        request.type = 'request';
        return request;
      });
      let allFavourites = datasets.concat(requests);
      return allFavourites;
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  }
});
