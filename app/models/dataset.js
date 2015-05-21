import DS from "ember-data";


export default DS.Model.extend({
  properties : DS.belongsTo('property'),
  repository: DS.belongsTo('repository'),
  tags: DS.hasMany('tag'),
  comments: DS.hasMany('comments'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate'),
});
