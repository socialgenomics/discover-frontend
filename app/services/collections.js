import Service from "@ember/service";
import { inject as service } from "@ember/service";
import { get, set, observer } from "@ember/object";
import computed from "ember-macro-helpers/computed";
import { debounce } from "@ember/runloop";
import { resolve } from "rsvp";
import R from "npm:ramda";
import ENV from "repositive/config/environment";

export default Service.extend({
  ajax: service(),
  session: service(),
  flashMessages: service(),

  collectionsPerUserId: null,
  collections: computed(
    "session.authenticatedUser.id",
    "collectionsPerUserId",
    (userId, collectionsPerUserId) =>
      // check if there is a userId and if there is a promise for that user Id
      userId && get(collectionsPerUserId, userId)
        ? get(collectionsPerUserId, userId)
        : resolve([])
  ),

  observeUserId: observer("session.authenticatedUser.id", function() {
    this.refreshCollections();
  }),

  init() {
    this._super(...arguments);
    set(this, "collectionsPerUserId", {});
    this.refreshCollections();
  },

  refreshCollections() {
    if (get(this, "session.authenticatedUser.id")) {
      debounce(this, this.loadCollectionsForCurrentUser, 50);
    } // else do nothing
  },

  loadCollectionsForCurrentUser() {
    if (get(this, "session.authenticatedUser.id")) {
      return this.loadCollectionsForUser(
        get(this, "session.authenticatedUser.id")
      );
    }
  },
  loadCollectionsForUser(userId) {
    set(this, `collectionsPerUserId.${userId}`, this._fetchCollections(userId));
  },

  _fetchCollections(userId) {
    return get(this, "ajax")
      .request(
        `${
          ENV.APIRoutes["new-bookmarks"]["view-collections"]
        }?owner_id=${userId}`
      )
      .then(R.prop("result"))
      .then(collections => {
        return collections;
      });
  }
});
