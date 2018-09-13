import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { alias } from '@ember/object/computed';

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
  subscriptions: hasMany('subscription'),
  datasourceId: belongsTo('collection', { inverse: 'owns' }),
  highlights: belongsTo('highlight'),
  userId: belongsTo('user'),

  accession: alias('externalId')
});
