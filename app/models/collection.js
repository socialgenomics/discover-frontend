import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  createdAt: attr('isodate'),
  description: attr('string'),
  name: attr('string'),
  properties: attr('object'),
  type: attr('string'),
  updatedAt: attr('isodate'),

  actions: hasMany('action'),
  datasets: hasMany('dataset'),
  owns: hasMany('dataset'),
  userId: belongsTo('user')
});
