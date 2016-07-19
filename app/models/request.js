import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.belongsTo('user'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate')
});
