import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { get } from "@ember/object";
import { alias } from "@ember/object/computed";
import computed from "ember-macro-helpers/computed";
import R from "npm:ramda";

export default Controller.extend({
  favourites: service(),
  collections: service(),
  session: service(),

  // this is used to show only favourites from a particular collection
  collectionFilter: null,
  // aliasing the model
  user: alias("model.user"),

  // no filtering for now
  filteredBookmarks: computed("allUserBookmarks", R.identity),
  isOwnProfile: computed(
    "user.id",
    "session.authenticatedUser.id",
    (userId, authenticatedUserId) => userId === authenticatedUserId
  ),
  pageTitleText: computed(
    "isOwnProfile",
    "user.data.firstname",
    (isOwnProfile, user) => `${isOwnProfile ? "Your" : `${user}'s`} collections`
  ),
  allUserBookmarks: computed(
    "user.id",
    "favourites.bookmarksPerUserId",
    (userId, bookmarksPerUserId) => get(bookmarksPerUserId, userId)
  ),
  allUserCollections: computed(
    "user.id",
    "collections.collectionsPerUserId",
    (userId, collectionsPerUserId) => get(collectionsPerUserId, userId)
  ),

  actions: {
    createCollection() {
      throw new Error("not implemented - to be done directly in the service");
    },
    updateCollectionName() {
      throw new Error("not implemented - to be done directly in the service");
    },
    deleteCollection() {
      throw new Error("not implemented - to be done directly in the service");
    }
  }
});
