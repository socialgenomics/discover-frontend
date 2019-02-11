import { expect } from "chai";
import { describe, it } from "mocha";
import { setupTest } from "ember-mocha";
import { get, setProperties } from "@ember/object";
import { run } from "@ember/runloop";

describe("Unit | Controller | user/index", function() {
  setupTest("controller:user/index", {
    needs: ["service:session", "service:collections", "service:metrics"]
  });

  it("computes an empty list of activities", function() {
    let controller = this.subject();
    run(() => {
      setProperties(controller, {
        requests: [],
        registrations: [],
        contributions: [],
        discussions: []
      });
      // set(controller, "contributions", [23,3]);
      expect(get(controller, "activitiesNumber")).to.eq(0);
    });
  });

  it("computed a random list of activities", function() {
    let controller = this.subject();
    run(() => {
      setProperties(controller, {
        requests: [1],
        registrations: [2, 3],
        contributions: [4, 5],
        discussions: [6, 7, 8]
      });
      expect(get(controller, "activitiesNumber")).to.eq(8);
    });
  });
});
