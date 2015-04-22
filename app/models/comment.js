import DS from "ember-data";

var Comment = DS.Model.extend({
  text: DS.attr('string'),
});

export default Comment;
