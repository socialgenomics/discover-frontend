import DS from 'ember-data';

var Dataset = DS.Model.extend({
  name: DS.attr('string'),
 // created: DS.attr('date'),
  description: DS.attr('string'),
  //tags: DS.hasMany('tag'),
  //user: DS.belongsTo('user'),
  //TODO: add properties field with custom datatype - json
});

export default Dataset;
