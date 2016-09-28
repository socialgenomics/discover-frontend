import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  actions: hasMany('action'),
  dataset: belongsTo('dataset'),
  request: belongsTo('request')
  //Could you have computed properties for favourites, tags, comments etc?
});
