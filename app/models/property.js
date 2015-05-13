import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  sampleTechnology: DS.attr('String'),
  dataset: DS.belongsTo('dataset')
});
