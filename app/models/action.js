import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  actionable_model: attr('string'),
  collection: belongsTo('collection'),
  createdAt: attr('isodate'),
  dataset: belongsTo('dataset'),
  properties: attr('object'),
  request: belongsTo('request'),
  type: attr('string'),
  userId: belongsTo('user')
});
