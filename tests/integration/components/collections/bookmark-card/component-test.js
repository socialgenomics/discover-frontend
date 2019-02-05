import { expect } from "chai";
import { describe, it } from "mocha";
import { setupComponentTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";

describe("Integration | Component | collections/bookmark card", function() {
  setupComponentTest("collections/bookmark-card", {
    integration: true
  });

  it("renders", function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#collections/bookmark-card}}
    //     template content
    //   {{/collections/bookmark-card}}
    // `);
    this.set("stuff", { resource: { type: "dataset" } });
    this.render(hbs`{{collections/bookmark-card stuff}}`);
    expect(this.$()).to.have.length(1);
  });

  // NOTE: (leojpod - 2019-02-05) At the moment this component is dumb and does not do anything, hence there is no real need to have tests for it.
});
