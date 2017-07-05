import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { Model } = DS;

export default Model.extend({
  dataset: belongsTo('dataset'),
  request: belongsTo('request'),
  subscriptions: hasMany('subscription')
});
