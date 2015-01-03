import DS from 'ember-data';

export default = DS.Model.extend({
  name: DS.attr('string'),
  datasets: DS.hasMany('dataset'),
});
