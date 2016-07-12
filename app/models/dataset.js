import DS from 'ember-data';
import { poisson } from 'repositive/utils/distributions';

export default DS.Model.extend({
  userId: DS.belongsTo('user'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  tech: DS.attr('string'),
  assay: DS.attr('string'),
  //properties : DS.belongsTo('property'),
  datasourceId: DS.belongsTo('datasource'),
  favorites: DS.hasMany('favourite'),
  comments: DS.hasMany('comments'),
  tags: DS.hasMany('tag'),
  highlights: DS.belongsTo('highlight'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate'),
  count: DS.attr('number'),
  isRequest: DS.attr('boolean'),
  externalID: DS.attr('string'),
  accession: function() {
    return this.get('externalID');
  }.property('externalID'),
  shortDescription: function() {
    let length = 100;
    let description = this.get('description');
    if (description.length > length) {
      description = description.substr(0, length) + ' ..';
    }
    return description;
  }.property('description'),
  colour: DS.attr('string'),
  views: function() {
    return this.get('count') + poisson(2);
  }.property('count')
});
