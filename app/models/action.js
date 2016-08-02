import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  properties: attr('object'),
  type: attr('string'),
  userId: belongsTo('user'),
  actionableId: belongsTo('actionable'),
  createdAt: attr('isodate')
});
