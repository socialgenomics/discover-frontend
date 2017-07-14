import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';
import { keyForAttribute, normalizeKeyName } from './application';

export default JSONSerializer.extend({
  serialize: function(snapshot) {
    let json =  snapshot._attributes;
    json.user_id = snapshot.belongsTo('userId').id;
    return json;
  },

  keyForRelationship: function (key, kind, method) {
    if (method === 'serialize') {
      if (key === 'actionableId' || key === 'subscribableId') {
        return 'id';
      }
      return normalizeKeyName(key);
    } else {
      return Ember.String.underscore(key).toLowerCase();
    }
  },

  keyForAttribute: keyForAttribute
});
