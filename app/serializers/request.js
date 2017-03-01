import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';
import { normalizeKeyName, keyForAttribute} from './application';

export default JSONSerializer.extend({
  serialize: function(snapshot, options) {
    let json =  snapshot._attributes;
    json.user_id = snapshot.belongsTo('userId').id;
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
