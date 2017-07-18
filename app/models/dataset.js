import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { computed, get } = Ember;

export default Model.extend({
  access: attr('string'),
  assay: attr('string'),
  createdAt: attr('isodate'),
  description: attr('string'),
  externalId: attr('string'),
  properties: attr('object'),
  stats: attr('object'),
  tech: attr('string'),
  title: attr('string'),
  updatedAt: attr('isodate'),
  url: attr('string'),

  actions: hasMany('action'),
  collections: hasMany('collection', { inverse: 'datasets' }),
  datasourceId: belongsTo('collection', { inverse: 'owns' }),
  highlights: belongsTo('highlight'),
  subscribableId: belongsTo('subscribable', { inverse: 'dataset' }),
  userId: belongsTo('user'),

  accession: computed('externalId', function() {
    return get(this, 'externalId');
  })
});
