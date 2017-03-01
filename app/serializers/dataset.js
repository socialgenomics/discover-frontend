import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';
import { keyForRelationship, keyForAttribute} from './application';

export default JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    highlights: { embedded: 'always' }
  },
  serialize: function(snapshot, options) {
    let json =  snapshot._attributes;
    json.user_id = snapshot.belongsTo('userId').id;
    json.datasource_id = snapshot.belongsTo('datasourceId').id;
    json.external_id = json.externalId;
    delete json.externalId;
    return json;
  },
  keyForRelationship: keyForRelationship,
  keyForAttribute: keyForAttribute
});
