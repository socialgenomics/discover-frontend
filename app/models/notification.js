import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  properties: attr('object'),
  status: attr('string'),
  subscriptionId: belongsTo('subscription'),
  subscription: attr('object'),
  userId: belongsTo('user'),
  createdAt: attr('isodate')
});
