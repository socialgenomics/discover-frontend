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
    set(this, `collectionsPerUserId.${userId}`, this._fetchCollections(userId));
  },
  async createCollection(name) {
    const userId = get(this, "userId");
    try {
      const response = await this._createCollection(name, userId, "user");
      const collections = get(this, `collectionsPerUserIds.${userId}`);
      collections.pushObject(response);
    } catch (err) {
      throw new Error("We couldn't create the collection. Try again later.");
    }
  },
  async deleteCollection(collectionId) {
    const userId = get(this, "userId");
    try {
      await this._deleteCollection(collectionId, userId);
      const collections = get(this, "collections");
      const newCollections = collections.filter(c => c.id !== collectionId);
      set(this, `collectionsPerUserId.${userId}`, resolve(newCollections));
    } catch (err) {
      Logger.error(err);
      throw new Error("We couldn't delete the collection. Try again later.");
    }
  },
  async updateCollectionName(collectionId, name) {
    const userId = get(this, "userId");
    try {
      await this._updateCollectionName(collectionId, name);
      const collections = get(this, "collections");
      const newCollections = collections.map(c =>
        c.id === collectionId ? { ...c, name } : c
      );
      set(this, `collectionsPerUserId.${userId}`, resolve(newCollections));
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

  _createCollection(name, owner_id) {
    return get(this, "ajax").request(
      ENV.APIRoutes["new-bookmarks"]["create-collection"],
      {
        method: "POST",
        contentType: "application/json",
        data: { name, owner_id }
      }
    );
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
