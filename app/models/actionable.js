import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  actions: hasMany('action'),
  dataset: belongsTo('dataset')
  //requests: belongsTo('request')
});
