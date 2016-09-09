import Ember from 'ember';

const { inject: { service }, Service, computed } = Ember;

export default Service.extend({
  store: service(),
  session: service(),
  favouriteList: computed('session.authenticatedUser', 'store', function() {
    const currentUser = this.get('session.authenticatedUser');
    const store = this.get('store');
    let favourites = store.query('action', {
      user_id: currentUser.id,
      type: 'favourite'
    })
    .then(resp => {
      return resp;
    });
    return favourites;
  })
});
