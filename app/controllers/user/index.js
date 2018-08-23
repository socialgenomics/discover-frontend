import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import computed from 'ember-macro-helpers/computed';
import R from 'npm:ramda';


export default Controller.extend({
  session: service(),
  favourites: service(),

  user: alias('model.user'),
  favouriteResources: computed('favourites.bookmarks', (boomarkPromise) =>
    boomarkPromise.then(R.map(R.prop('resource')))
  ),
  isOwnProfile: computed('model.user.id', 'session.authenticatedUser.id', function(profileUserId, sessionUserId) {
    if (sessionUserId === profileUserId) {
      return true;
    }
  })
});
