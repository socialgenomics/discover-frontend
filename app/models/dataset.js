import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  userId: DS.belongsTo('user'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  url: DS.attr('string'),
  tech: DS.attr('string'),
  assay: DS.attr('string'),
  access: DS.attr('string'),
  datasourceId: DS.belongsTo('datasource'),
  actionableId: DS.belongsTo('actionable', { inverse: 'dataset' }),
  highlights: DS.belongsTo('highlight'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate'),
  stats: DS.attr('object'),
  externalId: DS.attr('string'),
  accession: Ember.computed('externalId', function() {
    return this.get('externalId');
  }),
  colour: DS.attr('string')
});
