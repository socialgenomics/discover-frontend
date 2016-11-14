import Ember from 'ember';

const { inject: { service }, Service, Logger, get, getWithDefault, set } = Ember;

export default Service.extend({
  store: service(),
  session: service(),
  flashMessages: service(),
  userFavourites: undefined, //list of actions where type = 'favourite'

  loadFavourites() {
    if (!get(this, 'userFavourites')) { //favourites haven't been loaded yet
      const currentUserId = get(this, 'session.session.authenticated.user.id');
      const store = get(this, 'store');
      return store.query('action', {
        'where.user_id': currentUserId,
        'where.type': 'favourite',
        limit: 1000 // remove the limit to 10 response
      })
      .then(favourites => {
        set(this, 'userFavourites', []);
        favourites.map(favourite => get(this, 'userFavourites').push(favourite));
      })
      .catch(Logger.error);
    }
  },
  removeFavourite(favourite) {
    const updatedFavourites = get(this, 'userFavourites').without(favourite);
    set(this, 'userFavourites', updatedFavourites);
  },
  pushFavourite(favourite) {
    get(this, 'userFavourites').push(favourite);
    this.notifyPropertyChange('userFavourites');
  },
  getFavourite(actionableId) {
    return getWithDefault(this, 'userFavourites', []).findBy('actionableId.id', actionableId);
  }
});
