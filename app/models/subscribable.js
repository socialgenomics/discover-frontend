import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  subscriptions: hasMany('subscription'),
  dataset: belongsTo('dataset'),
  request: belongsTo('request')
});
