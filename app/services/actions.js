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

  pushFavourite(favourite) {
    this.get('userFavourites').push(favourite);
    this.notifyPropertyChange('userFavourites');
  },

  //Returns true if the actionableId matches the actionableId
  //for any favourites in userFavourites
  actionableIsFavourite(actionableId) {
    let favourites = this.get('userFavourites');
    return favourites.isAny('actionableId.id', actionableId);
  },
  //TODO refactor to query the already loaded favourites rather than DB
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
