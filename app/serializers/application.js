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
  }

  // //Removes JSON root object on requests, as needed by server.
  // serializeIntoHash: function(hash, type, record, options) {
  //   Ember.merge(hash, this.serialize(record, options));
  // },

  // normalizeSingleResponse: function(store, primaryModelClass, payload, id, requestType) {
  //   let typeKey = primaryModelClass.modelName;
  //   payload[typeKey] = payload;
  //   console.log(payload);
  //   return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, true);
  // },

  // normalizeArrayResponse: function(store, primaryModelClass, payload, id, requestType) {
  //   var pluralTypeKey = Ember.Inflector.inflector.pluralize(primaryModelClass.modelName);
  //   payload[pluralTypeKey] = payload;
  //   console.log(payload);
  //   return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, false);
  // }
  // normalizeResponse(store, primaryModelClass, payload, id, requestType) {
  //   let newPayload = {
  //     [primaryModelClass.modelName] : payload
  //   };
  //   console.log(newPayload);
  //   return this._super(store, primaryModelClass, newPayload, id, requestType);
  // }
});
