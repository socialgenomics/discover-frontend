import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  active: attr('bool'),
  subscribable_model: attr('string'),
  subscribableId: belongsTo('subscribable'),
  createdAt: attr('isodate'),
  userId: belongsTo('user')
});
