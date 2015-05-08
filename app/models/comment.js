import DS from "ember-data";

var Comment = DS.Model.extend({
  text: DS.attr('string'),
  user: DS.belongsTo('user'),
});

export default Comment;
