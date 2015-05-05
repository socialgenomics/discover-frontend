import DS from "ember-data";

export default DS.Model.extend({
  degree: DS.attr('string'),
  university: DS.attr('string'),
});
