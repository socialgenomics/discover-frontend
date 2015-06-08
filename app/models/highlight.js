import DS from "ember-data";


export default DS.Model.extend({
  dataset: DS.belongsTo('dataset'),
  title: DS.attr('string'),
  description: DS.attr('string'),
});

