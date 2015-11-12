import DS from 'ember-data';

export default DS.Model.extend({
  avatar: DS.attr('string'),
  gravatar: DS.attr('boolean', {defaultValue: false}),
  educationDegree: DS.attr('string'),
  educationUniversiry: DS.attr('string'),
  workRole: DS.attr('string'),
  workOrganisation: DS.attr('string'),
  interests: DS.attr('string'),
  user: DS.belongsTo('user', { async: true })
});
