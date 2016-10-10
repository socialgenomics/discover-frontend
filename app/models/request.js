import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  userId: belongsTo('user'),
  title: attr('string'),
  description: attr('string'),
  actionableId: belongsTo('actionable', { inverse: 'request' }),
  stats: attr('object'),
  createdAt: attr('isodate'),
  updatedAt: attr('isodate')
});
