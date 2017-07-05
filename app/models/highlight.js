import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  description: attr('string'),
  title: attr('string'),

  dataset: belongsTo('dataset')
});
