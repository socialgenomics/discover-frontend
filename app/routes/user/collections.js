import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { get } from "@ember/object";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  favourites: service(),
  collections: service(),
  redirectionURL: "/",
  model() {
    const { id: userId } = this.paramsFor("user");
    const favourites = get(this, "favourites");
    // side-load the bookmarks
    favourites.loadBookmarksForUser(userId);
    const collections = get(this, "collections");
    // side-load the collections
    collections.loadCollectionsForUser(userId);
    return this.modelFor("user");
  }
});
