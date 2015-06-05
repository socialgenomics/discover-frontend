import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  datasets: DS.hasMany('dataset'),
  query: DS.attr('string'),
//  filters: DS.haMany('filter'),
});
