import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';
import { keyForAttribute, normalizeKeyName } from './application';

const { isNone, get } = Ember;

export default JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  keyForAttribute: keyForAttribute,
  keyForRelationship: function (key, kind, method) {
    if (method === 'serialize') {
      if (key.slice(-2) === 'Id' && key !== 'userId') {
        return 'actionable_id';
      }
      return normalizeKeyName(key);
    } else {
      return Ember.String.underscore(key).toLowerCase();
    }
  },

  normalize(typeClass, hash) {
    const fields = get(typeClass, 'fields');
    fields.forEach((field) => {
      const payloadField = Ember.String.underscore(field);
      if (field === payloadField) { return; }

      hash[field] = hash[payloadField];
      delete hash[payloadField];
    });

    if (hash.actionable_id) {
      const keyName = hash.actionable_model + '_id';
      hash[keyName] = hash.actionable_id;
      delete hash.actionable_id;
    }
    return this._super.apply(this, arguments);
  },

  serializeBelongsTo(snapshot, json, relationship) {
    let key = relationship.key;
    const belongsTo = snapshot.belongsTo(key);
    key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo", "serialize") : key;
    //check json if actionable_id already exists
    if (isNone(json[key])) {
      json[key] = isNone(belongsTo) ? belongsTo : belongsTo.id;
    }
  }
});
