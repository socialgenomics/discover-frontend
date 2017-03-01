import JSONSerializer from 'ember-data/serializers/json';
import { keyForRelationship, keyForAttribute} from './application';

export default JSONSerializer.extend({
  serialize: function(snapshot, options) {
    let json =  snapshot._attributes;
    json.user_id = snapshot.belongsTo('userId').id;
    return json;
  },
  keyForRelationship: keyForRelationship,
  keyForAttribute: keyForAttribute
});
