import Controller from '@ember/controller';
import { get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import computed from 'ember-macro-helpers/computed';
import R from 'npm:ramda';


export default Controller.extend({
  session: service(),
  collections: service(),

  user: alias('model.user'),
  favouriteResources: computed('user.id', 'collections.othersBookmarks', (userId, bookmarksPerUserId) =>
    get(bookmarksPerUserId, userId)
      .then(R.map(R.prop('resource')))
  ),
  isOwnProfile: computed('model.user.id', 'session.authenticatedUser.id', function(profileUserId, sessionUserId) {
    if (sessionUserId === profileUserId) {
      return true;
    }
  })
});
