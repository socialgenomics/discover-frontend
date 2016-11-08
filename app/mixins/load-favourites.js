import Ember from 'ember';

const { Mixin, inject: { service }, get } = Ember;

export default Mixin.create({
  favouritesService: service('favourites'),
  session: service(),
  afterModel(){
    const isAuthenticated = get(this, 'session').get('isAuthenticated');
    if (isAuthenticated) {
      get(this, 'favouritesService').loadFavourites();
    }
  }
});
