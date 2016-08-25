import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.belongsTo('user'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  actionableId: DS.belongsTo('actionable', { inverse: 'request' }),
  stats: DS.attr('object'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate')
});
