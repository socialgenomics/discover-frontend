import Ember from 'ember';
import { isVerified } from './users/trust';
import ENV from 'repositive/config/environment';

const { inject: { service }, Route, RSVP, get, Logger } = Ember;

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
        return RSVP.hash({
          user: user,
          registrations: this.store.query('dataset', { 'where.user_id': userId }),
          requests: this.store.query('request', { 'where.user_id': userId }),
          user_credential: this.store.query('credential', { 'where.user_id': userId }),
          external_accounts: this.store.query('credential', { 'where.user_id': userId, 'where.provider': 'email'}), // TODO: change to query for third party accs
          favourited_data: this._getFavouritedData(params.id),
          user_comments: this.store.query('action', { 'where.user_id': userId, 'where.type': 'comment' })
        });
      })
      .then(values => {
        this.controllerFor('user.index').set('favouritedData', values.favourited_data);
        return {
          user: values.user,
          registrations: values.registrations,
          requests: values.requests,
          external_accs: values.external_accounts,
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
        const datasets = data.datasets.map(datasetObj => {
          return this.store.push(this.store.normalize('dataset', datasetObj));
        });
        const requests = data.requests.map(requestObj => {
          return this.store.push(this.store.normalize('request', requestObj));
        });
        return [...datasets, ...requests];
      }).catch(Logger.error);
  }
});
