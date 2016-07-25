import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  //Removes JSON root object on requests, as needed by server.
  serializeIntoHash: function(hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  }

  // normalizeResponse(store, primaryModelClass, payload, id, requestType) {
  //   let newPayload = {dataset: payload};
  //   console.log(newPayload);
  //   console.log(id);
  //   // return this._super(store, primaryModelClass, newPayload, id, requestType);
  // }

  // normalizeSingleResponse: function(store, primaryModelClass, payload, id, requestType) {
  //   // let typeKey = primaryModelClass.modelName;
  //   // payload[typeKey] = payload;
  //   let newPayload = {
  //     dataset : payload
  //   };
  //   console.log(newPayload);
  //   console.log(id);
  //   return this._super(store, primaryModelClass, newPayload, id, requestType);
  // }
});
