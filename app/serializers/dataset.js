import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    properties: {embedded: 'always'},
    tags: {embedded: 'always'}
  },
});
