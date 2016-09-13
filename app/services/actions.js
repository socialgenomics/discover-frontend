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
    const currentUser = this.get('session.authenticatedUser');
    const store = this.get('store');
    store.query('action', {
      user_id: currentUser.id,
      type: 'favourite'
    })
    .then(favourites => {
      this.set('userFavourites', []);
      favourites.map(favourite => {
        this.get('userFavourites').push(favourite);
      });
    });
  },

  actionableIsFavourite(actionableId) {
    //returns true if the actionableId matches the actionableId
    //for any favourites in userFavourites
    let favourites = this.get('userFavourites');
    return favourites.isAny('actionableId.id', actionableId);
  },

  //Not needed - all datasets seem to already have an actionableId
  // findOrCreate(store, id) {
  //   store.findRecord('actionable', id)
  //   .then(actionable => {
  //     console.log(actionable);
  //   });
  //   // if (existing) {
  //   //   return existing;
  //   // } else {
  //   //   return store.createRecord('actionable', { id: id });
  //   // }
  // },

  getFavouritesByActionable(actionableId) {
    const currentUser = this.get('session.authenticatedUser');
    const store = this.get('store');
    let favourites = store.query('action', {
      actionable_id: actionableId,
      user_id: currentUser.id, //if userId you have to supply a model ... Ths WON't work
      type: 'favourite'
    })
    .then(resp => {
      return resp;
    });
    return favourites;
  }
});
