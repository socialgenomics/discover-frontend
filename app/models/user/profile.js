import DS from "ember-data";

export default DS.Model.extend({
  avatar: DS.attr('string'),
  educationDegree: DS.attr('string'),
  educationUniversity: DS.attr('string'),
  workRole: DS.attr('string'),
  workOrganisation: DS.attr('string'),
  interests: DS.attr('string'),
});
