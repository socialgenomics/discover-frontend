import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    properties: {embedded: 'always'},
    repository: {embedded: 'always'},
    highlights: {embedded: 'always'},
    tags: {embedded: 'always'},
    comments: {embedded: 'always'},
    owner: { serialize: 'ids' },
  },
  serialize: function(snapshot, options){
    let sourceJSON = {
      downloadURL: snapshot.record.properties.get('downloadURL'),
      title: snapshot.record.properties.get('title'),
      description: snapshot.record.properties.get('description'),
    }
    return {
      sourceJSON: JSON.stringify(sourceJSON),
      repository: 'REPOSITIVE',
      isRequest: snapshot.get('isRequest')
    }
  },
  keyForRelationship: function(key, relationship, method) {
    return 'userId'
  }
});
