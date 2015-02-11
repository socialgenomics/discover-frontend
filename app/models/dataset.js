import DS from 'ember-data';

var Dataset = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  metadata: DS.attr('string'),
  //createdAt: DS.attr('date'),
  //updatedAt: DS.attr('date'),
  //tags: DS.hasMany('tag'),
  //user: DS.belongsTo('user'),
  //TODO: add properties field with custom datatype - json
});

export default Dataset;
