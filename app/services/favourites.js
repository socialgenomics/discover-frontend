import Ember from 'ember';

const { inject: { service }, Service } = Ember;

export default Service.extend({
  store: service(),
  session: service(),
  flashMessages: service(),
  userFavourites: [], //list of actions where type = 'favourite'
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
  }
});
