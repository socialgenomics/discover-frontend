import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';
import { keyForRelationship, keyForAttribute} from './application';

export default JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    userProfile: { embedded: 'always' }
  },
  keyForRelationship: keyForRelationship,
  keyForAttribute: keyForAttribute
});
