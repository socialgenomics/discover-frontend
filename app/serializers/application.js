import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({
  keyForRelationship: function(key, kind, method)  {
    if (method === 'serialize') {
      //check that last 2 chars of key are not "Id" first
      const lastTwoCharsOfKey = key.slice(-2).toLowerCase();
      if (lastTwoCharsOfKey !== 'id' ) {
        return `${key}_id`;
      } else {
        return key.slice(0, -2) + '_id';
      }
    } else {
      let toReturn = Ember.String.underscore(key).toLowerCase();
      return toReturn;
    }
  },

  keyForAttribute: function(attr, method) {
    return Ember.String.underscore(attr).toLowerCase();
  }
  // //Removes JSON root object on requests, as needed by server.
  // serializeIntoHash: function(hash, type, record, options) {
  //   Ember.merge(hash, this.serialize(record, options));
  // },
});
