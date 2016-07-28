import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';

export default JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    highlights: { embedded: 'always' }
  }
});
