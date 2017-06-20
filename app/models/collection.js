import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  actions: hasMany('action'),
  createdAt: attr('isodate'),
  datasets: hasMany('dataset'),
  description: attr('string'),
  name: attr('string'),
  owns: hasMany('dataset'),
  properties: attr('object'),
  type: attr('string'),
  updatedAt: attr('isodate'),
  userId: belongsTo('user')
});
