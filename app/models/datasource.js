import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  homepage: attr('string'),
  name: attr('string'),
  shortName: attr('string'),
  description: attr('string'),
  access: attr('string'),
  datasets: hasMany('dataset'),
  createdAt: attr('isodate'),
  updatedAt: attr('isodate')
});
