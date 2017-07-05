import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  createdAt: attr('isodate'),
  description: attr('string'),
  stats: attr('object'),
  title: attr('string'),
  updatedAt: attr('isodate'),

  actions: hasMany('action'),
  subscribableId: belongsTo('subscribable', { inverse: 'request' }),
  userId: belongsTo('user')
});
