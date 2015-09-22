import Ember from "ember";
import Session from "simple-auth/session";
let { Component, inject } = Ember;

Component.reopen({
  profile: inject.service()
});

export function initialize(container, application) {
  Ember.Component = Component;

  application.inject('route', 'profile', 'service:profile');
  application.inject('controller', 'profile', 'service:profile');
}

export default {
  name: "user-session",
  before: "simple-auth",
  initialize: function(container) {
    Session.reopen({
      setCurrentUser: function() {
        var userData = this.get("user");
        var that = this;

        if (!Ember.isEmpty(userData)) {
          var user = container.lookup("store:main").push("user", userData);
          that.set("currentUser", user);
          return user;
        }
      }.observes("user")
    });
  }
};
