import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  active: attr('bool'),
  createdAt: attr('isodate'),
  subscribable_model: attr('string'),
  subscribableId: belongsTo('subscribable'),
  userId: belongsTo('user')
});
