import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  actionableId: belongsTo('actionable', { inverse: 'collection' }),
  name: attr('string'),
  description: attr('string'),
  properties: attr('object'),
  type: attr('string'),
  owns: hasMany('dataset'),
  datasets: hasMany('dataset'),
  userId: belongsTo('user'),
  createdAt: attr('isodate'),
  updatedAt: attr('isodate')
});
