import DS from 'ember-data';

export default DS.Model.extend({
  dataset: DS.belongsTo('Dataset'),
  user: DS.belongsTo('user')
});
