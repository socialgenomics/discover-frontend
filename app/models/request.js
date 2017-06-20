import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  actions: hasMany('action'),
  createdAt: attr('isodate'),
  description: attr('string'),
  stats: attr('object'),
  subscribableId: belongsTo('subscribable', { inverse: 'request' }),
  title: attr('string'),
  updatedAt: attr('isodate'),
  userId: belongsTo('user')
});
