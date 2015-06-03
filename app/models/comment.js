import DS from "ember-data";

var Comment = DS.Model.extend({
  user: DS.belongsTo('user'),
  dataset: DS.belongsTo('dataset'),
  parentComment: DS.belongsTo('comment', {inverse: 'childComments'}),
  childComments: DS.hasMany('comment', {inverse: 'parentComment'}),
  text: DS.attr('string'),
});

export default Comment;
