import DS from "ember-data";


export default DS.Model.extend({
  properties : DS.belongsTo('property'),
  tags: DS.hasMany('tag'),
  comments: DS.hasMany('comments'),
});
