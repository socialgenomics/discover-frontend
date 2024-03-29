import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  actionable_model: attr('string'),
  createdAt: attr('isodate'),
  properties: attr('object'),
  type: attr('string'),

  collectionId: belongsTo('collection'),
  datasetId: belongsTo('dataset'),
  requestId: belongsTo('request'),
  userId: belongsTo('user')
});
