import JSONSerializer from 'ember-data/serializers/json';
import { keyForRelationship, keyForAttribute} from './application';

export default JSONSerializer.extend({
  serialize: function(snapshot) {
    const json =  snapshot._attributes;
    json.user_id = snapshot.belongsTo('userId').id;
    delete json.properties.action;
    delete json.subscription;
    return json;
  },
  keyForRelationship: keyForRelationship,
  keyForAttribute: keyForAttribute
});
