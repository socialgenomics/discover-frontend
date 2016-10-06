import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  userId: belongsTo('user'),
  title: attr('string'),
  description: attr('string'),
  url: attr('string'),
  tech: attr('string'),
  assay: attr('string'),
  access: attr('string'),
  collections: hasMany('collection'),
  datasourceId: belongsTo('datasource'),
  actionableId: belongsTo('actionable', { inverse: 'dataset' }),
  highlights: belongsTo('highlight'),
  createdAt: attr('isodate'),
  updatedAt: attr('isodate'),
  stats: attr('object'),
  externalId: attr('string'),
  accession: Ember.computed('externalId', function() {
    return this.get('externalId');
  }),
  colour: attr('string')
});
