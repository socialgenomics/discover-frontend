import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  properties: attr('object'),
  type: attr('string'),
  datasets: hasMany('datasets'),
  createdAt: attr('isodate'),
  updatedAt: attr('isodate')
});
