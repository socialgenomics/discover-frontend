import Ember from 'ember';

const { inject: { service }, Service, computed } = Ember;

export default Service.extend({
  store: service(),
  session: service(),
  allFavourites: computed('session.authenticatedUser', 'store', function() {
    const currentUser = this.get('session.authenticatedUser');
    const store = this.get('store');
    return store.query('action', {
      user_id: currentUser.id, //if userId you have to supply a model ... Ths WON't work
      type: 'favourite'
    })
    .then(resp => {
      return resp;
    });
  }),

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
