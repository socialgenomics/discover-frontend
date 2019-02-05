import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  ajax: service(),
  session: service(),
  favouritesService: service("favourites"),

  model: function() {
    return this.modelFor("user");
  }
});
