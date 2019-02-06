import Component from "@ember/component";
import { get, set, setProperties } from "@ember/object";
import { reads } from "@ember/object/computed";
import { htmlSafe } from "@ember/string";
import computed from "ember-macro-helpers/computed";

export default Component.extend({
  tagName: "span",

  isNew: false,
  isEditing: false,
  isHovered: false,
  content: null,
  contentClass: null,
  inputClass: "input-small",
  placeholder: null,

  newContent: reads("content"),
  deleteStyle: computed(
    "isHovered",
    "onDeleteAction",
    (isHovered, onDeleteAction) => {
      if (onDeleteAction && isHovered) {
        return htmlSafe("");
      } else {
        return htmlSafe("visibility: hidden;");
      }
    }
  ),

  actions: {
    stopEditing() {
      setProperties(this, {
        isEditing: false,
        newContent: get(this, "content")
      });
    },
    onChange() {
      const content = get(this, "newContent").trim();
      if (content !== "") {
        if (get(this, "isNew")) {
          get(this, "saveNewContentAction")(content);
        } else {
          get(this, "updateContentAction")(content);
        }
      }
    },
    saveNewContentAction: null,
    updateContentAction: null,
    onDeleteAction: null,
    enterEditMode(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      set(this, "isEditing", true);
    },
    doNothing(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      return false;
    }
  },

  mouseEnter() {
    set(this, "isHovered", true);
  },
  mouseLeave() {
    set(this, "isHovered", false);
  }
});
