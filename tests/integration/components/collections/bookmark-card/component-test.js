import { expect } from "chai";
import { describe, it } from "mocha";
import { setupComponentTest } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";
import { resolve } from "rsvp";
import wait from "ember-test-helpers/wait";

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
    this.set("doNothing", () => {});
    this.render(
      hbs`{{collections/bookmark-card
        stuff
        canAddToCollections=true
        toggleCollectionParticipation=doNothing}}`
    );
    expect(this.$()).to.have.length(1);
  });

  describe("compute properly the number of collections that the given bookmark belongs to", function() {
    it("with no collections", function() {
      this.set("myBookmark", {
        id: "super-bookmark",
        resource: { type: "dataset" }
      });
      this.set("collections", resolve([]));
      this.set("doNothing", () => {});
      this.render(
        hbs`{{collections/bookmark-card
          myBookmark
          collections=collections
          canAddToCollections=true
          toggleCollectionParticipation=doNothing}}`
      );

      return wait().then(() => {
        // nothing should be shown so there shouldn't be a "• something"
        expect(
          this.$(".td-underline")
            .text()
            .split("•").length
        ).to.eq(1);
      });
    });

    it("with some collections that do not have bookmarks", function() {
      this.set("myBookmark", {
        id: "rare-bookmark",
        resource: { type: "dataset" }
      });
      this.set(
        "collections",
        resolve([
          {
            id: "collection-a",
            bookmarks: []
          },
          { id: "collection-b", bookmarks: [] },
          {
            id: "collection-c",
            bookmarks: []
          },
          {
            id: "collection-c",
            bookmarks: []
          }
        ])
      );
      this.set("doNothing", () => {});
      this.render(
        hbs`{{collections/bookmark-card
          myBookmark
          collections=collections
          canAddToCollections=true
          toggleCollectionParticipation=doNothing}}`
      );
      return wait().then(() => {
        // nothing should be shown so there shouldn't be a "• something"
        expect(
          this.$(".td-underline")
            .text()
            .split("•").length
        ).to.eq(1);
      });
    });

    it("with some collections that does not includes the bookmark", function() {
      this.set("myBookmark", {
        id: "rare-bookmark",
        resource: { type: "dataset" }
      });
      this.set(
        "collections",
        resolve([
          {
            id: "collection-a",
            bookmarks: [
              "super-bookmark",
              "another-bookmark",
              "a third bookmark"
            ]
          },
          { id: "collection-b", bookmarks: [] },
          {
            id: "collection-c",
            bookmarks: [
              "simple-bookmark",
              "another-bookmark",
              "a third bookmark"
            ]
          },
          {
            id: "collection-c",
            bookmarks: [
              "super-bookmark",
              "another-bookmark",
              "a third bookmark"
            ]
          }
        ])
      );
      this.set("doNothing", () => {});
      this.render(
        hbs`{{collections/bookmark-card
          myBookmark
          collections=collections
          canAddToCollections=true
          toggleCollectionParticipation=doNothing}}`
      );
      return wait().then(() => {
        // nothing should be shown so there shouldn't be a "• something"
        expect(
          this.$(".td-underline")
            .text()
            .split("•").length
        ).to.eq(1);
      });
    });

    it("with some collections that includes the bookmark", function() {
      this.set("myBookmark", {
        id: "super-bookmark",
        resource: { type: "dataset" }
      });
      this.set(
        "collections",
        resolve([
          {
            id: "collection-a",
            bookmarks: [
              "super-bookmark",
              "another-bookmark",
              "a third bookmark"
            ]
          },
          { id: "collection-b", bookmarks: [] },
          {
            id: "collection-c",
            bookmarks: [
              "simple-bookmark",
              "another-bookmark",
              "a third bookmark"
            ]
          },
          {
            id: "collection-c",
            bookmarks: [
              "super-bookmark",
              "another-bookmark",
              "a third bookmark"
            ]
          }
        ])
      );
      this.set("doNothing", () => {});
      this.render(
        hbs`{{collections/bookmark-card
          myBookmark
          collections=collections
          canAddToCollections=true
          toggleCollectionParticipation=doNothing}}`
      );
      return wait().then(() => {
        const split = this.$(".td-underline")
          .text()
          .split("• ");
        expect(split.length).to.eq(2);
        expect(split[1].trim()).to.eq("2");
      });
    });
  });
});
