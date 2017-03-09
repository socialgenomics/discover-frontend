import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { computed } = Ember;

export default Model.extend({
  access: attr('string'),
  accession: computed('externalId', function() {
    return this.get('externalId');
  }),
  actionableId: belongsTo('actionable', { inverse: 'dataset' }),
  assay: attr('string'),
  collections: hasMany('collection', { inverse: 'datasets' }),
  colour: attr('string'),
  createdAt: attr('isodate'),
  datasourceId: belongsTo('collection', { inverse: 'owns' }),
  description: attr('string'),
  externalId: attr('string'),
  highlights: belongsTo('highlight'),
  properties: attr('object'),
  stats: attr('object'),
  subscribableId: belongsTo('subscribable', { inverse: 'dataset' }),
  tech: attr('string'),
  title: attr('string'),
  updatedAt: attr('isodate'),
  url: attr('string'),
  userId: belongsTo('user')
});
