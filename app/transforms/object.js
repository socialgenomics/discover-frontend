import DS from 'ember-data';
import Ember from 'ember';

const { Transform } = DS;
const { isNone } = Ember;

export default Transform.extend({
  deserialize: function(serialized) {
    return isNone(serialized) ? {} : serialized;
  },
  serialize: function(deserialized) {
    return isNone(deserialized) ? {} : deserialized;
  }
});
