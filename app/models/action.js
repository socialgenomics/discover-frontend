import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  actionable_model: attr('string'), //TODO remove this when safe
  collectionId: belongsTo('collection'),
  createdAt: attr('isodate'),
  datasetId: belongsTo('dataset'),
  properties: attr('object'),
  requestId: belongsTo('request'),
  type: attr('string'),
  userId: belongsTo('user')
});
