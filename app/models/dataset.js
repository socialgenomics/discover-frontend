import DS from 'ember-data';


var Dataset = DS.Model.extend({
  name: DS.attr('string'),
 // created: DS.attr('date'),
  description: DS.attr('string'),
  //tags: DS.hasMany('tag'),
  //user: DS.belongsTo('user'),
  //TODO: add properties field with custom datatype - json
});

Dataset.reopenClass({
  FIXTURES: [
    {
      id:1,
      name:'dataset1',
      description:'lalalla'
   //   tags: ['la', 'test', 'ok'],
   //   user: 1
    }
  ]
});

export default Dataset;
