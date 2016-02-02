import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  dataset: DS.belongsTo('dataset'),
  // parentComment: DS.belongsTo('comment', {inverse: 'childComments'}),
  // childComments: DS.hasMany('comment', {inverse: 'parentComment'}),
  text: DS.attr('string'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate')
});
