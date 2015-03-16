import Ember from "ember";  
import Session from "simple-auth/session";

export default {  
  name: "user-session",
  before: "simple-auth",
  initialize: function(container) {
    Session.reopen({
      setCurrentUser: function() {
        var userData = this.get("userData");
        var that = this;

        if (!Ember.isEmpty(userData)) {
          var user = container.lookup("store:main").push("user", userData);
          that.set("currentUser", user);
          return user;
        }
      }.observes("userData")
    });
  }
};
