import Ember from 'ember';

const { inject: { service }, Service } = Ember;

export default Service.extend({
  store: service(),
  session: service(),
  userFavourites: [],

  updateFavourites() {
    //Only update there are no favourites loaded
    if (this.get('userFavourites').length === 0) {
      const currentUserId = this.get('session.session.authenticated.user.id');
      const store = this.get('store');
      store.query('action', {
        user_id: currentUserId,
        type: 'favourite'
      })
      .then(favourites => {
        this.set('userFavourites', []);
        favourites.map(favourite => {
          this.get('userFavourites').push(favourite);
        });
      });
    }
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

  //Returns true if the actionableId matches the actionableId
  //for any favourites in userFavourites
  actionableIsFavourite(actionableId) {
    let favourites = this.get('userFavourites');
    return favourites.isAny('actionableId.id', actionableId);
  }
});
