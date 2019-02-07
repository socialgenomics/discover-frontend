import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import computed from 'ember-macro-helpers/computed';
import { get } from "@ember/object";

export default Controller.extend({
  session: service(),
  favourites: service(),
  collections: service(),

  user: alias('model.user'),
  isOwnProfile: computed('model.user.id', 'session.authenticatedUser.id', function(profileUserId, sessionUserId) {
    if (sessionUserId === profileUserId) {
      return true;
    }
  }),

  allUserBookmarks: computed(
    "user.id",
    "favourites.bookmarksPerUserId",
    (userId, bookmarksPerUserId) => get(bookmarksPerUserId, userId)
  ),

  allUserCollections: computed(
    "user.id",
    "collections.collectionsPerUserId",
    (userId, collectionsPerUserId) => get(collectionsPerUserId, userId)
  )
});
