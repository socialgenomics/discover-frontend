import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'uuid',
  attrs: {
    properties: {embedded: 'always'},
    tags: {embedded: 'always'}
  }
});
