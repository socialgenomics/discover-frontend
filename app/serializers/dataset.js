import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    properties: {embedded: 'always'},
    repository: {embedded: 'always'},
    tags: {embedded: 'always'},
    owner: { serialize: 'ids' },
  },
  serialize: function(snapshot, options){
    let sourceJSON = {
      downloadURL: snapshot.record.properties.get('link'),
      title: snapshot.record.properties.get('title'),
      description: snapshot.record.properties.get('description'),
    }
    return { 
      sourceJSON: JSON.stringify(sourceJSON),
      repository: 'REPOSITIVE',
    }
  },
  keyForRelationship: function(key, relationship, method) {
    return 'userId'
  }
});
