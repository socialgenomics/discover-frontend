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
  actions: DS.hasMany('action'),
  // favorites: DS.hasMany('favourite'),
  // comments: DS.hasMany('comments'),
  // tags: DS.hasMany('tag'),
  highlights: DS.belongsTo('highlight'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate'),
  count: DS.attr('number'),
  externalId: DS.attr('string'),
  accession: function() {
    return this.get('externalId');
  }.property('externalId'),
  shortDescription: function() {
    let length = 100;
    let description = this.get('description');
    if (description.length > length) {
      description = description.substr(0, length) + ' ..';
    }
    return description;
  }.property('description'),
  // filter the actions by type
  // return only the comments from the actions
  comments: Ember.computed.filterBy('actions', 'type', 'comment'),
  colour: DS.attr('string')
});
