import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';
import { keyForAttribute, normalizeKeyName } from './application';

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

  keyForRelationship: function (key, kind, method) {
    if (method === 'serialize') {
      if (key === 'actionableId' || key === 'subscribableId') {
        return 'id';
      }
      normalizeKeyName(key);
    } else {
      return Ember.String.underscore(key).toLowerCase();
    }
  },

  keyForAttribute: keyForAttribute
});
