import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  actions: hasMany('action'),
  collection: belongsTo('collection'),
  dataset: belongsTo('dataset'),
  request: belongsTo('request')
});
