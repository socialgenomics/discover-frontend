import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

const { inject: { service }, Service } = Ember;

export default Service.extend({
  store: service(),
  session: service(),
  flashMessages: service(),
  userFavourites: [], //list of actions where type = 'favourite'
  favouritedData: [],
  loadFavourites() {
    const currentUserId = this.get('session.session.authenticated.user.id');
    const store = this.get('store');

    return store.query('action', {
      'where.user_id': currentUserId,
      'where.type': 'favourite',
      limit: 1000 // remove the limit to 10 response
    })
    .then(favourites => {
      this.set('userFavourites', []);
      favourites.map(favourite => {
        this.get('userFavourites').push(favourite);
      });
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  },

  removeFavourite(favourite) {
    const updatedFavourites = this.get('userFavourites').without(favourite);
    this.set('userFavourites', updatedFavourites);
  },
  pushFavourite(favourite) {
    this.get('userFavourites').push(favourite);
    this.notifyPropertyChange('userFavourites');
  },
  getFavourite(actionableId) {
    return this.get('userFavourites').findBy('actionableId.id', actionableId);
  },
  getFavouritedData(userIdOfProfile) {
    let token = this.get('session.session.content.authenticated.token');
    let authHeaders = {
      authorization: `JWT ${token}`
    };
    return Ember.RSVP.hash({
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
      this.set('favouritedData', allFavourites);
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  }
});
