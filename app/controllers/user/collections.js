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

  filteredBookmarks: computed('collectionFilterFunction', 'allUserBookmarks', async(collectionFilterFctPromise, allUserBookmarksPromise) => {
    const allUserBookmarks = await allUserBookmarksPromise;
    const collectionFilterFct = await collectionFilterFctPromise;
    return R.filter(collectionFilterFct)(allUserBookmarks);
  }),


  isOwnProfile: computed(
    "user.id",
    "session.authenticatedUser.id",
    (userId, authenticatedUserId) => userId === authenticatedUserId
  ),
  pageTitleText: computed(
    "isOwnProfile",
    "user.data.firstname",
    (isOwnProfile, user) => `${isOwnProfile ? "Your" : `${user}'s`}`
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

  selectedCollection: computed('collectionFilter', 'allUserCollections', async(collectionId, collectionsPromise ) => {
    if (collectionId) {
      const collections = await collectionsPromise;
      const collection =  R.find(R.propEq('id', collectionId))(collections);
      if (!collection) {
        throw new Error('trying to select an unexisting collection');
      }
      return collection;
    } else {
      return null;
    }
  }),

  collectionFilterFunction: computed('selectedCollection', async(collectionPromise) => {
    const collection = await collectionPromise;
    if (collection) {
      const filterFct = R.pipe(
        R.prop('id'),
        R.flip(R.contains)(collection.bookmarks)
      );
      return filterFct;
    } else {
      return () => true;
    }
  }),

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
