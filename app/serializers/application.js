import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
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
  },
  serializeIntoHash: function(hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  }
  // normalizeSingleResponse: function(store, primaryModelClass, payload, id, requestType) {
  //   let typeKey = primaryModelClass.modelName;
  //   payload[typeKey] = payload;
  //   //delete payload['data'];
  //   console.log(payload);
  //   return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, true);
  // },
  // normalizeResponse(store, primaryModelClass, payload, id, requestType) {
  //   let newPayload = {
  //     [primaryModelClass.modelName] : payload
  //   };
  //   console.log(newPayload);
  //   return this._super(store, primaryModelClass, newPayload, id, requestType);
  // }
});
