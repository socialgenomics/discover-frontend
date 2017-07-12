import JSONSerializer from 'ember-data/serializers/json';
import { keyForAttribute} from './application';

export default JSONSerializer.extend({
  serialize: function(snapshot) {
    let json =  snapshot._attributes;
    json.user_id = snapshot.belongsTo('userId').id;
    return json;
  },

  keyForAttribute: keyForAttribute
});
