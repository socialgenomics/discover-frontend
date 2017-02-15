import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  actionableId: belongsTo('actionable', { inverse: 'request' }),
  createdAt: attr('isodate'),
  description: attr('string'),
  stats: attr('object'),
  subscribableId: belongsTo('subscribable', { inverse: 'request' }),
  title: attr('string'),
  updatedAt: attr('isodate'),
  userId: belongsTo('user')
});
