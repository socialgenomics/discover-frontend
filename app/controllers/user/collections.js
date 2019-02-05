import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { get } from "@ember/object";
import { alias } from "@ember/object/computed";
import computed from "ember-macro-helpers/computed";
import R from "npm:ramda";

export default Controller.extend({
  favourites: service(),
  session: service(),

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
    "user",
    isOwnProfile => `${isOwnProfile ? "Your" : "someone else's"} collections`
  ),
  allUserBookmarks: computed(
    "user.id",
    "favourites.othersBookmarks",
    (userId, bookmarksPerUserId) => get(bookmarksPerUserId, userId)
  ),
});
