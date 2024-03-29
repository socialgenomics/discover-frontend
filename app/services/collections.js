import Service from "@ember/service";
import { inject as service } from "@ember/service";
import { get, set, observer } from "@ember/object";
import { alias } from "@ember/object/computed";
import computed from "ember-macro-helpers/computed";
import { debounce } from "@ember/runloop";
import { resolve } from "rsvp";
import R from "npm:ramda";
import ENV from "repositive/config/environment";
import Ember from "ember";
const { Logger } = Ember;

export default Service.extend({
  ajax: service(),
  session: service(),
  flashMessages: service(),
  favourites: service(),

  collectionsPerUserId: null,
  userId: alias("session.authenticatedUser.id"),
  collections: computed(
    "session.authenticatedUser.id",
    "collectionsPerUserId",
    (userId, collectionsPerUserId) =>
      // check if there is a userId and if there is a promise for that user Id
      userId && get(collectionsPerUserId, userId)
        ? get(collectionsPerUserId, userId)
        : resolve([])
  ),

  observeUserId: observer("userId", function() {
    this.refreshCollections();
  }),

  init() {
    this._super(...arguments);
    set(this, "collectionsPerUserId", {});
    this.refreshCollections();
  },

  async toggleCollectionParticipation(collectionId, bookmarkId) {
    const userId = get(this, "userId");
    const collection = (await get(this, "collections"))
      .filter(R.propEq("id", collectionId))
      .pop();
    if (!collection) {
      throw new Error(
        `trying to modify a non-existing collection (id: ${collectionId})`
      );
    }
    const bookmark = (await get(this, "favourites.bookmarks")).filter(
      R.propEq("id", bookmarkId)
    );
    if (!bookmark) {
      throw new Error(
        `trying to modify a non-existing bookmark (id: ${bookmarkId})`
      );
    }
    const collectionBookmarks = get(collection, "bookmarks");
    let newBookmarksList;
    if (collectionBookmarks.includes(bookmarkId)) {
      // then we need to remove it
      try {
        await this._removeBookmarkFromCollection(collectionId, bookmarkId);
        newBookmarksList = collectionBookmarks.filter(id => bookmarkId !== id);
      } catch (err) {
        newBookmarksList = collectionBookmarks;
        throw new Error(
          "We couldn't delete the bookmark to your collection. Please try again."
        );
      }
    } else {
      // then we need to add it
      try {
        await this._addBookmarkToCollection(collectionId, bookmarkId);
        collectionBookmarks.push(bookmarkId);
        newBookmarksList = collectionBookmarks;
      } catch (err) {
        // TODO recover from that error!
        newBookmarksList = collectionBookmarks;
        throw new Error(
          "We couldn't add the bookmark to your collection. Please try again."
        );
      }
    }
    set(collection, "bookmarks", newBookmarksList);
    const newCollections = (await get(this, "collections")).map(c => {
      if (c.id === collectionId) {
        return { ...c, bookmarks: newBookmarksList };
      } else {
        return c;
      }
    });
    const collectionsPerUserId = get(this, "collectionsPerUserId");
    set(this, "collectionsPerUserId", {
      ...collectionsPerUserId,
      [userId]: resolve(newCollections)
    });
  },
  refreshCollections() {
    if (get(this, "userId")) {
      debounce(this, this.loadCollectionsForCurrentUser, 50);
    } // else do nothing
  },

  loadCollectionsForCurrentUser() {
    if (get(this, "userId")) {
      return this.loadCollectionsForUser(get(this, "userId"));
    }
  },
  loadCollectionsForUser(userId) {
    const collectionsPerUserId = get(this, "collectionsPerUserId");
    set(this, "collectionsPerUserId", {
      ...collectionsPerUserId,
      [userId]: this._fetchCollections(userId)
    });
  },
  async createCollection(name) {
    const userId = get(this, "userId");
    try {
      const newCollection = await this._createCollection(name, userId, "user");
      const collections = await get(this, "collections");
      const collectionsPerUserId = get(this, "collectionsPerUserId");
      set(this, "collectionsPerUserId", {
        ...collectionsPerUserId,
        [userId]: resolve([...collections, newCollection])
      });
    } catch (err) {
      Logger.error(err);
      throw new Error("We couldn't create the collection. Try again later.");
    }
  },
  async deleteCollection(collectionId) {
    const userId = get(this, "userId");
    try {
      await this._deleteCollection(collectionId, userId);
      const collections = await get(this, "collections");
      const newCollections = collections.filter(c => c.id !== collectionId);
      const collectionsPerUserId = get(this, "collectionsPerUserId");
      set(this, "collectionsPerUserId", {
        ...collectionsPerUserId,
        [userId]: resolve(newCollections)
      });
    } catch (err) {
      Logger.error(err);
      throw new Error("We couldn't delete the collection. Try again later.");
    }
  },
  async updateCollectionName(collectionId, name) {
    const userId = get(this, "userId");
    try {
      await this._updateCollectionName(collectionId, name);
      const collections = await get(this, "collections");
      const newCollections = collections.map(c =>
        c.id === collectionId ? { ...c, name } : c
      );
      const collectionsPerUserId = get(this, "collectionsPerUserId");
      set(this, "collectionsPerUserId", {
        ...collectionsPerUserId,
        [userId]: resolve(newCollections)
      });
    } catch (err) {
      Logger.error(err);
      throw new Error("We couldn't rename the collection. Try again later.");
    }
  },

  _fetchCollections(userId) {
    return get(this, "ajax")
      .request(
        `${
          ENV.APIRoutes["new-bookmarks"]["view-collections"]
        }?owner_id=${userId}`
      )
      .then(R.prop("result"));
  },

  _removeBookmarkFromCollection(collection_id, bookmark_id) {
    return get(this, "ajax").request(
      ENV.APIRoutes["new-bookmarks"]["delete-bookmark-from-collection"],
      {
        method: "POST",
        contentType: "application/json",
        data: {
          collection_id,
          bookmark_id
        }
      }
    );
  },

  _addBookmarkToCollection(collection_id, bookmark_id) {
    return get(this, "ajax").request(
      ENV.APIRoutes["new-bookmarks"]["add-bookmark-to-collection"],
      {
        method: "POST",
        contentType: "application/json",
        data: {
          collection_id,
          bookmark_id
        }
      }
    );
  },

  _createCollection(name, owner_id) {
    return get(this, "ajax")
      .request(ENV.APIRoutes["new-bookmarks"]["create-collection"], {
        method: "POST",
        contentType: "application/json",
        data: { name, owner_id }
      })
      .then(R.prop("result"));
  },

  _deleteCollection(collection_id) {
    return get(this, "ajax").request(
      ENV.APIRoutes["new-bookmarks"]["delete-collection"],
      {
        method: "POST",
        contentType: "application/json",
        data: { collection_id }
      }
    );
  },

  _updateCollectionName(collection_id, name) {
    return get(this, "ajax").request(
      ENV.APIRoutes["new-bookmarks"]["change-collection-name"],
      {
        method: "POST",
        contentType: "application/json",
        data: { collection_id, name }
      }
    );
  }
});
