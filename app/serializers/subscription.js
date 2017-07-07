import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';
import { keyForAttribute, normalizeKeyName } from './application';

const { isNone, get , String: { underscore } } = Ember;

export default JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  keyForAttribute: keyForAttribute,

  keyForRelationship: function (key, kind, method) {
    if (method === 'serialize') {
      if (key.slice(-2) === 'Id' && key !== 'userId') {
        return 'subscribable_id';
      }
      return normalizeKeyName(key);
    } else {
      return underscore(key).toLowerCase();
    }
  },

  normalize(typeClass, hash) {
    const fields = get(typeClass, 'fields');
    debugger;
    fields.forEach(field => {
      const payloadField = underscore(field);
      if (field === payloadField) { return; }

      hash[field] = hash[payloadField];
      delete hash[payloadField];
    });

    if (hash.subscribable_id) {
      const keyName = hash.subscribable_model + '_id';
      hash[keyName] = hash.subscribable_id;
      delete hash.subscribable_id;
    }

    return this._super.apply(this, arguments);
  },

  serializeBelongsTo(snapshot, json, relationship) {
    let key = relationship.key;
    const belongsTo = snapshot.belongsTo(key);

    key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo", "serialize") : key;
    //check json if subscribable_id already exists
    if (isNone(json[key])) {
      json[key] = isNone(belongsTo) ? belongsTo : belongsTo.id;
    }
  }
});
