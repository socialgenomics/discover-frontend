import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  actionableId: belongsTo('actionable', { inverse: 'request' }),
  createdAt: attr('isodate'),
  description: attr('string'),
  stats: attr('object'),
  title: attr('string'),
  updatedAt: attr('isodate'),
  userId: belongsTo('user')
});
