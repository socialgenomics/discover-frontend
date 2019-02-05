import Component from "@ember/component";
import { get } from "@ember/object";

export default Component.extend({
  tagName: "",
  bookmark: undefined,
  didReceiveAttrs() {
    this._super(...arguments);
    if (!get(this, "bookmark")) {
      throw new Error("missing the content property (positional parameter)");
    }
  }
}).reopenClass({
  positionalParams: ["bookmark"]
});
