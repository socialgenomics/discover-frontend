import DS from 'ember-data';

export default DS.Model.extend({
  homepage: DS.attr('string'),
  name: DS.attr('string'),
  shortName: DS.attr('string'),
  description: DS.attr('string'),
  access: DS.attr('string'),
  datasets: DS.hasMany('dataset'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate')
});
