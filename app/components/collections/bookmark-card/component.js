import Component from "@ember/component";
import { get } from "@ember/object";
import { resolve } from "rsvp";
import computed from "ember-macro-helpers/computed";

export default Component.extend({
  tagName: "",
  bookmark: undefined,
  toggleCollectionParticipation: undefined,
  canAddToCollections: false,
  collections: resolve([]),
  numOfRelatedCollections: computed(
    "collections",
    "bookmark.id",
    (collectionsPromise, bookmarkId) =>
      collectionsPromise.then(
        collections =>
          collections
            .map(collection => collection.bookmarks)
            .filter(
              bookmarksForACollection =>
                bookmarksForACollection.filter(
                  bookmark => bookmark.id === bookmarkId
                ).length > 0
            ).length
      )
  ),
  didReceiveAttrs() {
    this._super(...arguments);
    if (!get(this, "bookmark")) {
      throw new Error("missing the content property (positional parameter)");
    }
    if (!get(this, "toggleCollectionParticipation")) {
      throw new Error("missing the toggleCollectionParticipation property");
    }
  }
}).reopenClass({
  positionalParams: ["bookmark"]
});
