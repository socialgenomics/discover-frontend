import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  createdAt: attr('isodate'),
  properties: attr('object'),
  status: attr('string'),
  subscription: attr('object'),
  subscriptionId: belongsTo('subscription'),
  userId: belongsTo('user')
});
