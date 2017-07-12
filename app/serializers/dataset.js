import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';
import { keyForAttribute } from './application';

export default JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    highlights: { embedded: 'always' }
  },
  serialize: function(snapshot) {
    let json =  snapshot._attributes;
    json.user_id = snapshot.belongsTo('userId').id;
    json.datasource_id = snapshot.belongsTo('datasourceId').id;
    json.external_id = json.externalId;
    delete json.externalId;
    return json;
  },

  keyForAttribute: keyForAttribute
});
