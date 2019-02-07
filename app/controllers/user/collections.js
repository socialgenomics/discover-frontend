import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { get } from "@ember/object";
import { alias } from "@ember/object/computed";
import computed from "ember-macro-helpers/computed";
import R from "npm:ramda";

export default Controller.extend({
  flashMessages: service(),
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
    "favourites.bookmarksPerUserId.[]",
    (userId, bookmarksPerUserId) => get(bookmarksPerUserId, userId)
  ),
  allUserCollections: computed(
    "user.id",
    "collections.collectionsPerUserId.[]",
    (userId, collectionsPerUserId) => get(collectionsPerUserId, userId)
  ),

  actions: {
    async createCollection(name) {
      const collections = get(this, 'collections');
      try {
        await collections.createCollection(name);
      } catch (err) {
        get(this, 'flashMessages').warning("We could not create the collection. Try again later.");
      }
    },
    async updateCollectionName(collectionId, newName) {
      const collections = get(this, 'collections');
      try {
        await collections.updateCollectionName(collectionId, newName);
      } catch (err) {
        get(this, 'flashMessages').warning("We could not rename the collection. Try again later.");
      }
    },
    async deleteCollection(collectionId) {
      const collections = get(this, 'collections');
      try {
        await collections.deleteCollection(collectionId);
      } catch (err) {
        get(this, 'flashMessages').warning("We could not reate the collection. Try again later.");
      }
    }
  }
});
