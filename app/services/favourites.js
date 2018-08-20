import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get, getWithDefault, set } from '@ember/object';
import Logger from 'repositive/utils/logger';

export default Service.extend({
  store: service(),
  session: service(),
  flashMessages: service(),

  userFavourites: undefined, //list of actions where type = 'favourite'

  loadFavourites() {
    if (get(this, 'userFavourites') === undefined && get(this, 'session.isAuthenticated')) { //favourites haven't been loaded yet
      const currentUserId = get(this, 'session.session.authenticated.user.id');
      const store = get(this, 'store');

      return store.query('action', {
        'where.user_id': currentUserId,
        'where.type': 'favourite',
        limit: 1000
      })
        .then(favourites => {
          set(this, 'userFavourites', []);
          favourites.map(favourite => get(this, 'userFavourites').push(favourite));
        })
        .catch(Logger.error);
    }
  },
  fetchFavorites() {

  }

  removeFavourite(favourite) {
    set(this, 'userFavourites', get(this, 'userFavourites').without(favourite));
    this.notifyPropertyChange('userFavourites');
  },

  pushFavourite(favourite) {
    get(this, 'userFavourites').push(favourite);
    this.notifyPropertyChange('userFavourites');
  },

  getFavourite(modelId, modelName) {
    const keyName = modelName + 'Id.id';
    return getWithDefault(this, 'userFavourites', []).findBy(keyName, modelId);
  }
});
