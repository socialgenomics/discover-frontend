import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  assayType: DS.attr('string'),
  dataset: DS.belongsTo('dataset'),
  downloadURL: DS.attr('string'),
});
