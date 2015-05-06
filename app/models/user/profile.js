import DS from "ember-data";

export default DS.Model.extend({
  education: DS.belongsTo('user.education'),
  work: DS.belongsTo('user.work'),
  interests: DS.attr('string'),
});
