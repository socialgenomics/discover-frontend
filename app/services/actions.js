import Ember from 'ember';

const { inject: { service }, Service } = Ember;

export default Service.extend({
  store: service(),
  session: service(),
  userFavourites: [],

  //Called:
  // - on app load
  // - when something has been favourited/unfaved
  updateFavourites() {
    console.log('Favourites Updated!');
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
  },

  //Returns true if the actionableId matches the actionableId
  //for any favourites in userFavourites
  actionableIsFavourite(actionableId) {
    let favourites = this.get('userFavourites');
    return favourites.isAny('actionableId.id', actionableId);
  },

  getFavouritesByActionable(actionableId) {
    const currentUserId = this.get('session.session.authenticated.user.id');
    const store = this.get('store');
    let favourites = store.query('action', {
      actionable_id: actionableId,
      user_id: currentUserId,
      type: 'favourite'
    })
    .then(resp => {
      return resp;
    });
    return favourites;
  }
});
