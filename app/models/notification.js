import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  context: attr('object'),
  status: attr('string'),
  subscriptionId: belongsTo('subscription'),
  userId: belongsTo('user')
});
