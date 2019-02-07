import { expect } from "chai";
import { describe, it } from "mocha";
import { setupTest } from "ember-mocha";
import { get, set } from "@ember/object";
import { run } from "@ember/runloop";

describe("Unit | Controller | user/collections", function() {
  setupTest("controller:user/collections", {
    // Specify the other units that are required for this test.
    needs: [
      "service:session",
      "service:collections",
      "service:favourites",
      "service:flashMessages",
      "service:metrics"
    ]
  });

  // Replace this with your real tests.
  it("exists", function() {
    let controller = this.subject();
    expect(controller).to.be.ok;
  });

  it("compute if the user is checking it's own collections", function() {
    let controller = this.subject();
    let session = get(controller, "session");
    run(() => {
      set(session, "authenticatedUser", {
        id: "jim-has-an-id"
      });
      set(controller, "model", {
        user: {
          data: { firstname: "John" },
          id: "john-has-an-id"
        }
      });

      expect(get(controller, "isOwnProfile")).to.eq(false);

      set(session, "authenticatedUser", {
        id: "john-has-an-id"
      });

      expect(get(controller, "isOwnProfile")).to.eq(true);
    });
  });

  it("compute the proper page title", function() {
    let controller = this.subject();
    let session = get(controller, "session");
    run(() => {
      set(session, "authenticatedUser", {
        id: "jim-has-an-id"
      });
      set(controller, "model", {
        user: {
          data: { firstname: "John" },
          id: "john-has-an-id"
        }
      });

      expect(get(controller, "pageTitleText")).to.eq("John's collections");

      set(session, "authenticatedUser", {
        id: "john-has-an-id"
      });

      expect(get(controller, "pageTitleText")).to.eq("Your collections");
    });
  });
});
